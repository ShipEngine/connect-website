[![ShipEngine Connect](https://connect.shipengine.com/img/logos/shipengine-connect-logo.png)](https://connect.shipengine.com)

ShipEngine Connect App Loader
==============================================

> ### ⚠ WARNING: This is an internal package
> Using this package directly is discouraged and unsupported. Instead, you should install
> [**@shipengine/connect**](https://www.npmjs.com/package/@shipengine/connect) which uses this package under the hood.
> See [our documentation](https://connect.shipengine.com/docs/cli) for more information.

<p><br></p>


This library loads a [**ShipEngine Connect**](https://connect.shipengine.com) app from an NPM package. Regardless of whether the app is written in JavaScript, TypeScript, JSON, YAML, or a mix of them all, the loader reads those files, validates them, and returns the app object.



Example
--------------------------
This example shows you how to use the loader to load an app, inspect its data, and call its methods.


```typescript
import loader from "@shipengine/connect-loader";

async function main() {
  // Load the ShipEngine Connect app
  let app = await loader.loadApp("/path/to/the/app");

  // Display the app's info
  console.log(`
    Successfully loaded ${app.manifest.name} v${app.manifest.version}

    This is a ${app.type} app that uses v${app.sdkVersion} of the SDK
  `);

  if (app.type === "carrier") {
    // Display the delivery services this carrier offers
    displayCarrierServices(app);

    // Create a shipment
    await createShipment(app);
  }
}


function displayCarrierServices(app) {
  console.log(`
    This carrier supports the following ${app.deliveryServices.length} delivery services:
  `);

  for (let deliveryService of app.deliveryServices) {
    console.log(`
      - ${deliveryService.name}
        class: ${deliveryService.class}
        grade: ${deliveryService.grade}
        service area: ${deliveryService.serviceArea}
        insurable?: ${deliveryService.isInsurable? "yes" : "no"}
        trackable?: ${deliveryService.isTrackable? "yes" : "no"}
    `);
  }
}


async function createShipment(app) {
  console.log(`
    Creating a shipment...
  `);

  let transaction = {
    id: "12345678-1234-1234-1234-123456789012",
    session: {
      foo: "bar",
    }
  };

  let shipment = await app.createShipment(transaction, {
    deliveryService: app.deliveryServices[0],
    shipFrom: {
      name: "John Doe",
      phoneNumber: "555-555-5555",
      company: "Example Corp",
      addressLines: ["4009 Marathon Blvd"],
      cityLocality: "Austin",
      stateProvince: "TX",
      postalCode: "78756",
      country: "US",
      timeZone: "America/Chicago",
      isResidential: false,
    },
    shipTo: {
      name: "Amanda Miller",
      phoneNumber: "111-111-1111",
      addressLines: ["525 S Winchester Blvd."],
      cityLocality: "San Jose",
      stateProvince: "CA",
      postalCode: "95128",
      country: "US",
      timeZone: "America/Los_Angeles",
      isResidential: true,
    },
    shipDateTime: {
      value: "2020-06-01T12:00:00",
      timeZone: "America/Chicago",
    },
    packages: [{
      packaging: app.packaging[0],
      label: {
        format: "pdf",
        size: "4x6",
      }
    }]
  });

  console.log(`
    Successfully created a shipment!

      tracking number: ${shipment.trackingNumber}
      delivery date: ${shipment.deliveryDateTime}
      total cost: ${shipment.totalAmount.value} ${shipment.totalAmount.currency}
  `)
}

main();
```



Local Development
--------------------------
To build/test the library locally on your computer:

1. __Install dependencies__<br>
`yarn`

2. __Run the build script__<br>
`yarn build` or `yarn watch`

3. __Run the tests__<br>
`yarn test`



Releasing
--------------------------
To release a new version, use the command below.

```bash
yarn release
```

This will do the following:

- Display any outdated dependencies and prompt you to update them
- Run a security vulnerability audit
- Do a clean re-build
- Run all tests
- Run linter checks
- Prompt you for the version number to bump to
- Tag, commit, and push to GitHub

Once the commit is merged to the `master` branch, the [CI/CD script](.github/workflows/CI-CD.yaml) will publish it to NPM.
