![FreightCo](logo.svg)
=====================================================

This folder contains sample [**ShipEngine Integration Platform**](https://www.shipengine.com/docs/integration-platform/) apps that demonstrate how to integrate a carrier into ShipEngine. In this case the carrier is a fictional company called "FreightCo".

FreightCo ships to/from Mexico, Canda, and the U.S. Because of its international reach, the apps include [**localization**](./carrier/index.js) support for Spanish and French in addition to English.



Sample Apps
-----------------------
This folder contains 2 sample apps.

| App                                     | Description
|-----------------------------------------|-----------------------------------------------------------------------------
| [`@freightco/connection`](./connection) | This app defines the [account connection form](./connection/forms/connect.js) and [account settings form](./connection/forms/settings.js) that enable a user to connect and manage their FreightCo account in ShipEngine. It also implements the [connection logic](./connection/connect.js), which validates a user's credentials and establishes a session.
| [`@freightco/carrier`](./carrier)       | This app defines the [delivery services](./carrier/delivery-services), [delivery confirmations](./carrier/delivery-confirmations), and [packaging](./carrier/packaging) that FreightCo supports. It also implements functionality, such as [creating labels](./carrier/create-label.js) and [calculating shipping costs](./carrier/get-rates.js).



About ShipEngine Integration Platform Apps
--------------------------------------------
Apps are just [NPM packages](https://docs.npmjs.com/about-packages-and-modules) that export an object with properties and methods that define the application's functionality.

An app must have a [`package.json` file](https://docs.npmjs.com/files/package.json) in its root directory, which specifies its name, version number, and dependencies. The [ShipEngine Integration Platform SDK](https://www.npmjs.com/package/@shipengine/integration-platform-sdk) (`@shipengine/integration-platform-sdk`) must be listed as a dependency or devDependency.

Other than that, the folder structure and file names are entirely up to you.  As long as your app exports an object with the right structure, it doesn't matter whether that object is defined in a single file or spread across many files.



Supported File Types
----------------------------
To make things even easier for you, ShipEngine Integration Platform supports JSON, JSON5, YAML, and even TypeScript files in addition to plain JavaScript. You can use any combination of these file types for different parts of your app.

The FreightCo apps are written entirely in **JavaScript**. See [other sample apps](../README.md) for examples in other formats.
