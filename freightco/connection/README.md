![FreightCo](../logo.svg)
=====================================================

This is a sample [**ShipEngine Integration Platform**](https://www.shipengine.com/docs/integration-platform/) app that demonstrate how to integrate a carrier into ShipEngine. In this case the carrier is a fictional company called "FreightCo".

FreightCo ships to/from Mexico, Canda, and the U.S. Because of its international reach, the app includes [**localization**](./index.js) support for Spanish and French in addition to English.

This app defines the [account connection form](./forms/connect.js) and [account settings form](./forms/settings.js) that enable a user to connect and manage their FreightCo account in ShipEngine. It also implements the [connection logic](./connect.js), which validates a user's credentials and establishes a session.



About ShipEngine Integration Platform Apps
--------------------------------------------
Apps are just [NPM packages](https://docs.npmjs.com/about-packages-and-modules) that export an object with properties and methods that define the application's functionality.

An app must have a [`package.json` file](https://docs.npmjs.com/files/package.json) in its root directory, which specifies its name, version number, and dependencies. The [ShipEngine Integration Platform SDK](https://www.npmjs.com/package/@shipengine/integration-platform-sdk) (`@shipengine/integration-platform-sdk`) must be listed as a dependency or devDependency.

Other than that, the folder structure and file names are entirely up to you.  As long as your app exports an object with the right structure, it doesn't matter whether that object is defined in a single file or spread across many files.



Supported File Types
----------------------------
To make things even easier for you, the ShipEngine Integration Platform supports JSON, JSON5, YAML, and even TypeScript files in addition to plain JavaScript. You can use any combination of these file types for different parts of your app.

The FreightCo app is written entirely in **JavaScript**. See [other sample apps](../../README.md) for examples in other formats.
