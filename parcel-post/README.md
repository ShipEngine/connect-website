![Parcel Post](logo.svg)
=====================================================

This folder contains sample [**ShipEngine Integration Platform**](https://www.shipengine.com/docs/integration-platform/) apps that demonstrate how to integrate a carrier into ShipEngine. In this case the carrier is a fictional company called "Parcel Post".

Parcel Post is a U.S. carrier that provides its own [pickup](./carrier/src/definitions/pickup-services.ts) and [same-day delivery](./carrier/src/definitions/delivery-services/same-day.ts) services. They use UPS to fulfill some of their [domestic delivery services](./carrier/src/definitions/delivery-services/domestic-standard.ts) and FedEx to fulfill their [international services](./carrier/src/definitions/delivery-services/international-priority.ts).



Sample Apps
-----------------------
This folder contains 2 sample apps.

| App                                       | Description
|-------------------------------------------|-----------------------------------------------------------------------------
| [`@parcel-post/connection`](./connection) | This app defines the [account connection form](./connection/src/forms/connect.ts) and [account settings form](./connection/src/forms/settings.ts) that enable a user to connect and manage their Parcel Post account in ShipEngine. It also implements the [connection logic](./connection/src/connect.ts), which validates a user's credentials and establishes a session.
| [`@parcel-post/carrier`](./carrier)       | This app defines the [pickup services](./carrier/src/definitions/pickup-services.ts), [delivery services](./carrier/src/definitions/delivery-services), [delivery confirmations](./carrier/src/definitions/delivery-confirmations.ts), and [packaging](./carrier/src/definitions/packaging) that Parcel Post and its fulfillment partners support. It also implements functionality, such as [creating labels](./carrier/src/methods/create-shipment.ts) and [calculating shipping costs](./carrier/src/methods/rate-shipment.ts).



About ShipEngine Integration Platform Apps
--------------------------------------------
Apps are just [NPM packages](https://docs.npmjs.com/about-packages-and-modules) that export an object with properties and methods that define the application's functionality.

An app must have a [`package.json` file](https://docs.npmjs.com/files/package.json) in its root directory, which specifies its name, version number, and dependencies. The [ShipEngine Integration Platform SDK](https://www.npmjs.com/package/@shipengine/integration-platform-sdk) (`@shipengine/integration-platform-sdk`) must be listed as a dependency or devDependency.

Other than that, the folder structure and file names are entirely up to you.  As long as your app exports an object with the right structure, it doesn't matter whether that object is defined in a single file or spread across many files.



Supported File Types
----------------------------
To make things even easier for you, the ShipEngine Integration Platform supports JSON, JSON5, YAML, and even TypeScript files in addition to plain JavaScript. You can use any combination of these file types for different parts of your app.

The Parcel Post apps are written entirely in **TypeScript**. See [other sample apps](../README.md) for examples in other formats.
