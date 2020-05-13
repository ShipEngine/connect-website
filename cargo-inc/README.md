![Cargo Incorporated](logo.svg)
=====================================================

This folder contains sample [**ShipEngine Integration Platform**](https://www.shipengine.com/docs/integration-platform/) apps that demonstrate how to integrate a carrier into ShipEngine. In this case the carrier is a fictional company called "Cargo Incorporated".

Cargo Incorporated ships worldwide. Because of its global reach, the apps include [**localization**](./carrier/cargo-inc.yaml) support, including [form localization](./connection/forms/connect.json).



Sample Apps
-----------------------
This folder contains 2 sample apps.

| App                                     | Description
|-----------------------------------------|-----------------------------------------------------------------------------
| [`@cargo-inc/connection`](./connection) | This app defines the [account connection form](./connection/forms/connect.json) and [account settings form](./connection/forms/settings.json) that enable a user to connect and manage their Cargo Incorporated account in ShipEngine. It also implements the [connection logic](./connection/src/connect.js), which validates a user's credentials and establishes a session.
| [`@cargo-inc/carrier`](./carrier)       | This app defines the [delivery services](./carrier/delivery-services), [delivery confirmations](./carrier/delivery-confirmations), and [packaging](./carrier/packaging) that Cargo Incorporated supports. It also implements functionality, such as [creating labels](./carrier/src/create-shipment.js) and [calculating shipping costs](./carrier/src/rate-shipment.js).



About ShipEngine Integration Platform Apps
--------------------------------------------
Apps are just [NPM packages](https://docs.npmjs.com/about-packages-and-modules) that export an object with properties and methods that define the application's functionality.

An app must have a [`package.json` file](https://docs.npmjs.com/files/package.json) in its root directory, which specifies its name, version number, and dependencies. The [ShipEngine Integration Platform SDK](https://www.npmjs.com/package/@shipengine/integration-platform-sdk) (`@shipengine/integration-platform-sdk`) must be listed as a dependency or devDependency.

Other than that, the folder structure and file names are entirely up to you.  As long as your app exports an object with the right structure, it doesn't matter whether that object is defined in a single file or spread across many files.



Supported File Types
----------------------------
To make things even easier for you, ShipEngine Integration Platform supports JSON, JSON5, YAML, and even TypeScript files in addition to plain JavaScript. You can use any combination of these file types for different parts of your app.

The Cargo Incorporated apps use **YAML** for all of their metadata and **JavaScript** for their functionality. See [other sample apps](../README.md) for examples in other formats.
