---
title: Building Rating Logic
---

# Building rating logic

The simplest Native Rating carrier implementation looks like this:

```javascript
module.exports = {
  rateShipments: (context, ratingRequest) => [{ id: "empty-rates", rates: [] }],
};
```

This isn't very useful because for every request, an empty list of rates will be returned. But it shows some of the requirements of an implementation:

1. The code must have a single default export using [CommonJS](https://en.wikipedia.org/wiki/CommonJS)
2. The code must have NO external dependencies. This means no built-in or third party modules can be loaded.
3. The exported object must contain a `rateShipments` function that takes a context and a rating request object. It must return an array of rate results correlated with a request id.
4. The code must be plain Javascript.

Because these requirements make it tough to develop anything but the simplest rating logic, it is recommended to build the implementation using modern Javascript or [Typescript](https://www.typescriptlang.org/) patterns and then use something like [webpack](https://webpack.js.org/) to transpile and bundle your code.

A full configuration of webpack is outside the scope of this document because the options are nearly endless. However, including the following options in your `webpack.config.js` will help webpack produce code that Native Rating needs.

```javascript
module.exports = {
  ...,
  target: "node",
  output: {
    libraryTarget: "commonjs2"
  },
  ...
}
```

## Rating logic

There are many ways to implement rating logic, but for a Native Rating implementation, we've found that it's best to approach it in three steps:

1. Generate necessary data keys
2. Fetch required data
3. Build the rates from data

Let's break the steps down and talk about why it makes sense to think of an implementation in this way.

### Generate necessary data keys

The purpose of this step is to end up with the smallest list of data keys necessary that will need to be retrieved from the data store. You'll want to do as much validation as possible in this step and figure out what can be excluded from data retrieval. For example, if your carrier does not offer overnight service to Alaska and the shipment being rated has a destination of Alaska, you can exclude any keys that are associated with overnight rates. If your carrier only supports domestic shipments, you can immediately return an empty list of rates if the shipment has a different origin and destination country.

The difficult part about this step is trying to figure out the minimum amount of data you'll need during step 3.

### Fetch required data

After the list of keys needed is generated, the second step is to request the data from the [Native Rating context](./rating-context.md) that is passed in to your `rateShipments` function as the first argument. You should request all the data at once, if possible, as this will reduce the amount of time your logic is waiting for results. Calls to `context.get*` should be treated as expensive. Instead of doing this:

```javascript
// This gets data one at a time, which will wait for each request to finish before starting the next request
const rates = await context.getRates(["rate-key-1", "rate-key-2"]);
const metadata = await context.getMetadata(["meta-key-1", "meta-key-2"]);
const zones = await context.getZones(["zone-key-1", "zone-key-2"]);
```

You should do something like this:

```javascript
// This gets data all at once and will generally be faster
const ratePromise = context.getRates(["rate-key-1", "rate-key-2"]);
const metaPromise = context.getMetadata(["meta-key-1", "meta-key-2"]);
const zonePromise = context.getZones(["zone-key-1", "zone-key-2"]);

const [rates, metadata, zones] = await Promise.all([
  ratePromise,
  metaPromise,
  zonePromise,
]);
```

You should also try to avoid requesting data based on the results of a previous data request. The most common example of this is zone based rating. It's most straight-forward to get the zone for the shipment then based on the zone, generate they rating keys necessary. Unfortunately, this will result in two sequential calls made to the data store. Instead, see if it makes sense to generate keys for all zones and then request them at the same time that you're getting the zone. When you have both sets of data, you can get the rate that applies.

```javascript
/**
 * This is a simple, but slower approach to zone-based rates
 */
const zoneKey = "1-9"; // Get the zone for a shipment going from a postal code that starts
// with 1 to a postal code that starts with 9. NOTE: this is an
// arbitrary key format and can be whatever you want
const zones = await context.getZone([zoneKey]);

// Now build up the keys based on the zone we got back
const zone = zones[zoneKey];
const rateKeys = [`ground-${zone}`, `air-${zone}`];
const rates = await context.getRates(rateKeys);

/**
 * This is a more efficient approach, but is more complex to reason about
 */
const zoneKey = "1-9"; // Get the zone for a shipment going from a postal code that starts
// with 1 to a postal code that starts with 9. NOTE: this is an
// arbitrary key format and can be whatever you want
const zonePromise = context.getZone([zoneKey]);

// Build keys for all possible zones, which in our example is 1 through 5
const rateKeys = [1, 2, 3, 4, 5].flatMap((zone) => [
  `ground-${zone}`,
  `air-${zone}`,
]);
const [possibleRates, zones] = await Promise.all([
  context.getRates(rateKeys),
  zonePromise,
]);

// Now that we have all the data, get the applicable rates
const zone = zones[zoneKey];
const applicableRateKeys = [`ground-${zone}`, `air-${zone}`];
const rates = possibleRates.filter((rate) =>
  applicableRateKeys.includes(rate.key)
);
```

There is a point where this approach no longer makes sense and it is based on the total number of keys requested per function. There is not a hard number, but we've found that between 100 and 200 keys is when the performance characteristics change. So in the example above, if you had 10 zones, 10 services, and 10 different weight groups, you would need to request 1000 keys from the data store. If you requested the zone first, that would cut the number of keys down to 100.

### Build the rates from data

Once you have all the necessary data, you can build the final list of rates. This is where you would apply the data that you got back from the context and compile it into a valid rate set. In the examples above, you could just map the rates returned into the required RateResult format. In practice, it will usually be more complicated than that. For example, you may have requested metadata that dictates the maximum size of a flat rate box and based on that, you can now decide whether to return a flat rate for the shipment, or some scaled rate based on other metadata.

## Example carrier implementation

Here is an example implementation of a carrier using the simpler approach of requesting zone data and then rating data. It is not optimized at all and does not do any error handling because we want to focus on the basics. The code blocks can be copied and pasted in order, and includes the entire implementation.

```js
async function rateShipments(context, shipments) {
  let rateResults = [];

  for (const { id, shipment } of shipments) {
    // Get the possible zones for the shipment
    const zoneKeys = [
      `KEY-${shipment.ship_from.postal_code}-${shipment.ship_to.postal_code}`,
      `KEY-${shipment.ship_from.postal_code[0]}-${shipment.ship_to.postal_code}`,
      `KEY-${shipment.ship_from.postal_code}-${shipment.ship_to.postal_code[0]}`,
      `KEY-${shipment.ship_from.postal_code[0]}-${shipment.ship_to.postal_code[0]}`,
    ];

    const zones = await context.getZone(zoneKeys);
```

First, we build the list of zone keys that we want to retrieve. The keys are built in order from most specific to least specific and we do this because we've defined our zone data to minimize the amount of data needed. This allows us to have a single key to represent all shipments from postal codes that start with 6 that go to postal codes that start with 9. Then we can define exceptions on top of that, so that most of these shipments will be zone 2, for example, but a shipment from a postal code that starts with 6 going to postal code 91234 will be zone 99. Using these keys, we retrieve the zones from Native Rating.

```js
// Get rates and variables for the shipment
const ounces = shipment.packages[0].weight_details.weight_in_ounces || 0;
const weight = Math.max(Math.ceil(ounces / 160) * 10, 10);
const rateKeys = Object.values(zones).map(
  (zone) => `KEY-${shipment.service_code}-${zone}-${weight}lb`
);
const variableKeys =
  shipment.confirmation !== "None" ? ["KEY-confirmation-delivery"] : [];

const [rates, variables] = await Promise.all([
  context.getRates(rateKeys),
  context.getVariables(["KEY-add_on-1"].concat(variableKeys)),
]);
```

Next, we'll use the zones that we got back to build up a list of rating keys to retrieve. In our example, we are only going to return rates for the service code specified in the shipment. Your integration may do this, or you could ignore service code and always return all available rates. We create a rating key for each zone returned from the zone lookup and add the weight, rounded up to the nearest 10 pounds.

We also create a list of variables to retrieve. We will request `KEY-add_on-1` for all shipments and also `KEY-confirmation-delivery` if the shipment has any confirmation type specified. When the keys are created, we make a request for rates and variables simultaneously so that we don't have to wait for each request individually.

```js
// Now that we have all the necessary data, try to build the rates
const shipmentRate = zoneKeys
  .map((zoneKey) => zones[zoneKey])
  .filter((zone) => zone !== undefined)
  .map((zone) => rates[`KEY-${shipment.service_code}-${zone}-${weight}lb`])
  .find((x) => x);

const lineItems = [
  {
    billing_category: "shipping",
    amount: {
      amount: shipmentRate.amount.toFixed(2),
      currency: shipmentRate.currency,
    },
  },
];

const deliveryAmount = variables["KEY-confirmation-delivery"];
if (deliveryAmount) {
  lineItems.push({
    billing_category: "confirmation",
    amount: {
      amount: deliveryAmount.toFixed(2),
      currency: shipmentRate.currency,
    },
  });
}

const addOn1 = variables["KEY-add_on-1"];
if (addOn1) {
  lineItems.push({
    billing_category: "additional_fees",
    amount: {
      amount: (shipmentRate.amount * (addOn1.adjustment / 100)).toFixed(2),
      currency: shipmentRate.currency,
    },
  });
}
```

Once we have the rate and variable data, we can use everything we've received to build up the list of rates. The first step is to get the base shipping rate by looping through the zones from most specific to least specific and using the first rate we find. This is how we can handle generic zone rating while using more specific exceptions if there are any. Next, we use the variables to add the confirmation line item if necessary. Then we follow the same pattern to add the `additional_fees` billing line item using the `KEY-add_on-1` variable. If there is a value for that key, we use it as a percentage of the shipping cost to create the line item. This is to show off a few different ways variables can be used.

```js


    // Add the shipment rates to the list that will be returned
    rateResults.push({ id, rates: [{ service_code: shipment.service_code, billing_line_items: lineItems }] });
  }

  return rateResults;
}

// Export the function using CommonJS
module.exports = {
  default: { rateShipments },
};
```

Finally, we take the line items and create a rate response, adding the original id. This is how consumers can correlate their requests with rate responses. In this example, the responses will be in the same order as the requests, but if we'd rated multiple shipments simultaneously, that may not have been the case.
