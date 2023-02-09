---
title: Building an Implementation
---

# Building a Native Rating implementation

## Setup

Follow the [getting started](/getting-started/installing-nodejs/) walkthrough. On the [Initialize Project](/getting-started/initialize-project/) step, choose `Carrier app` when asked "what type of app are you building" and answer `Y` when asked "will this app use native rating". When this is finished, you will have a "fully working" Carrier connect app that uses Native Rating, ready to be modified however you see fit.

## Configuration

Before building your implementation, it is recommended to get the basic configuration out of the way. All configuration is done per carrier and is contained in the `NativeRating` property of the [carrier metadata](/shipping/#metadata-definition).

### DefaultRateCardId

The `DefaultRateCardId` property is the only value required to use Native Rating for your Carrier app. This rate card will be used for any customer that does not have a rate card id specified in their seller provider settings. If all rate cards are managed via Connect, then this id should match the id of one of the rate cards defined in the `RateCards` property discussed below. If this id does _not_ match a rate card defined in the `RateCards` property, then a rate card with that id should be created manually through the Native Rating management API directly or else the Native Rating system will return an error when attempting to get rates. This value can be changed at any time.

### RateCards

This is an optional array of rate cards that should be sent to the Native Rating system. If customer specific rate cards are not needed, then only a single rate card is needed and its id should be used as the `DefaultRateCardId` property mentioned above. This array can contain as many rate cards as are needed. Each rate card requires an id and a currency. Currency is used to decorate the values and ensure that rates of different currencies are not mixed. No currency conversion is done.

:::warning Note
Rate cards will never be removed through Connect. Rate cards defined outside of Connect will also not be affected.
:::warning

### Path

If data and and logic will be managed through Connect, then this value must be the path to the location on disk where data and logic exists. This path is relative to the root of the app and certain assumptions will be made about filenames and data layout. Assuming two rate cards defined in the `RateCards` property with the ids of `rate-card-1` and `rate-card-2`, if `Path` is set to `/path/to/rating`, the following directory and file layout will be assumed:

```
/path/to/rating
  rate-shipments.js
  zones.json
  /rate-card-1
    rate-shipments.js
    rates.json
    variables.json
  /rate-card-2
    rate-shipments.js
    rates.json
    variables.json
```

If there is carrier-wide rating logic, it should be in a file named `rate-shipments.js` at the root of the specified folder. If a file named `zones.json` is found at the root of the specified folder, it will be used as carrier-wide zone data otherwise no zone data will be uploaded.

Each rate card needs to have a folder named with its id. Within each rate card folder there are three files that can be specified. If the rate card has custom logic, it should be in a file within the rate card's folder named `rate-shipments.js`. If the rate card has rating data or custom variable data, it can specify files named `rates.json` or `variables.json` to define that data. The format of these files are defined below.

### Data formats

**Rates**

Rates are defined as simple key/value pairs where the value is a string representation of the rate. The keys are arbitrary and only carry whatever meaning the rating logic attaches to them. The only requirement the Native Rating system imposes is that they must be unique within a rate card.

```json
{
  "rates": [
    { "key": "ground-Z1-10lb", "value": "10.50" },
    { "key": "ground-Z1-20lb", "value": "205" },
    { "key": "air-Z1-20lb", "value": "1205" },
  ]
}
```

**Variables**

Like rates, variables are stored as key/value pairs but unlike rates, the values can be any valid json type. These keys are also arbitrary and must be unique within a rate card.

```json
{
  "variables": [
    { "key": "add_on-1", "value": { "adjustment": 3.5 } },
    { "key": "feature-1-enabled", "value": true },
    { "key": "custom-service-name", "value": "Some Name" }
  ]
}
```

**Zones**

Zone data is identical to variable data except that it is stored at the carrier level instead of within a specific rate card. If rate card specific zone data is needed, you can use variables for that instead of zones. The format is identical, meaning that zones use key/value pairs where the value can be any valid json type. The keys must be unique within the zone data.

```json
{
  "zones": [
    { "key": "4-7", "value": "Z1" },
    { "key": "6-9", "value": "Z2" },
    { "key": "6-99752", "value": "Z99" }
  ]
}
```

## Implementation

When the app shell is built and configured, you can [build your rating logic](./rating-logic.md). The linked document has instructions
for building the logic from scratch, but the Connect CLI gives you a shell function to start with, located either at `./src/methods/get-rates/rate-shipments.js` or `./src/methods/get-rates/rate-shipments.ts`, depending on whether you chose Typescript or Javascript
as your language.

### Build configuration

The package created by the Connect CLI uses WebPack to bundle the implementation and the configuration for this is in
`./webpack.config.js`. Modifying this file can break the deployment process so only make changes if you know how it will
affect the output and it is advised to keep a backup if you're not using source control.

If you are using Typescript for your app, configuration will be stored in `./tsconfig.json` but again, it's advised that
you don't modify this if you can avoid it. As before, it's worth keeping a backup if you're not using source control.

## Testing

The Connect tooling provides a simple test server that you can use to test your app. To start it, run the following commands:

```bash
npm run build   # Run before first start and after any other Connect changes
npm run bundle  # Run after any rating implementation changes
npm start
```

As pointed out by the comments, you only need to build before your first test run and after any changes made to the data. You only
need to run bundle after making rating logic implementation changes. It doesn't hurt to run both before every start, however. Once
the test server is running, you can make a request to `http://localhost:3005/rates` with shipment information, and should see output
similar to the following:

![example server output](./images/native-rating-api-server-output.png)

The server will show you which rate, metadata, and zone keys were requested and which were found in the sample data. The server will also expose a [docs endpoint](http://localhost/3005/docs) that will serve the OpenAPI spec of the Native Rating server. This will provide the shape of the input and output required by the `rates` endpoint.

## Deployment

:::warning Seller-specific Rate Card
All users will get rates from the default rate card defined in the carrier definition. If there are seller-specific rate cards, please contact the [Native Rating team](mailto:connect@shipengine.com) to have the rate card applied to the particular seller.
:::

### Publishing the Native Rating app

When the implementation is complete, you can use the Connect CLI to publish the Carrier app to the development
environment for live testing. To do this, ensure that the package is built and bundled by running the following:

```bash
npm run build
npm run bundle
```

When that is finished, publish the app using the Connect CLI:

```bash
connect publish
```

This will ask for your api key which you should have received before building your integration. If you do not have one,
contact the [ShipEngine Connect team](mailto:connect@shipengine.com). The publish process can take some time, but once
it is complete your rates will be available directly via the Native Rating service.

:::warning Note
Please note that publishing the Native Rating app from the Connect CLI makes the carrier available in Native Rating Service that can be accessed from development environments, like DDEs. To get the carrier rates in production, the carrier data needs to be published via Native Rating Service. Learn more about publishing carrier data [here](./publishing.md).
:::
