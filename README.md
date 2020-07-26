ShipEngine Integration Platform App Loader
==============================================


[![Cross-Platform Compatibility](https://shipengine.github.io/img/badges/os-badges.svg)](https://github.com/ShipEngine/shipengine-integration-platform-loader/actions)
[![Build Status](https://github.com/ShipEngine/shipengine-integration-platform-loader/workflows/CI-CD/badge.svg)](https://github.com/ShipEngine/shipengine-integration-platform-loader/actions)

[![Coverage Status](https://coveralls.io/repos/github/ShipEngine/shipengine-integration-platform-loader/badge.svg?branch=master)](https://coveralls.io/github/ShipEngine/shipengine-integration-platform-loader)
[![Dependencies](https://david-dm.org/ShipEngine/shipengine-integration-platform-loader.svg)](https://david-dm.org/ShipEngine/shipengine-integration-platform-loader)

[![npm](https://img.shields.io/npm/v/@shipengine/integration-platform-loader.svg)](https://www.npmjs.com/package/@shipengine/integration-platform-loader)
[![License](https://img.shields.io/npm/l/@shipengine/integration-platform-loader.svg)](LICENSE)


This library loads a [**ShipEngine Integration Platform app**](https://www.shipengine.com/docs/integration-platform/) from an NPM package. Regardless of whether the app is written in JavaScript, TypeScript, JSON, YAML, or a mix of them all, the loader reads those files, validates them, and returns the app object.



Installation
--------------------------
You can install the ShipEngine Integration Platform App Loader via [npm](https://docs.npmjs.com/about-npm/).

```bash
npm install @shipengine/integration-platform-loader
```

Example
--------------------------
This example shows you how to use the loader to load an app, inspect its data, and call its methods.


```typescript
import loader from "@shipengine/integration-platform-loader";

async function main() {
  // Load the ShipEngine Integration Platform app
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
