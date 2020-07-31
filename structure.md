---
title: ShipEngine Integration Platform application Overview
description: Learn about how a ShipEngine Integration application is structured.
---

Application Structure
==================
[ShipEngine Integration Platform](./index.md) applications are just [NPM](https://www.npmjs.com/) packages that meet the following requirements:

* Have a [`package.json`](https://docs.npmjs.com/creating-a-package-json-file) file in the root directory, which specifies its name, version number, and dependencies.

* List the [ShipEngine Integration Platform SDK](https://www.npmjs.com/package/@shipengine/integration-platform-sdk) (`@shipengine/integration-platform-sdk`) as a `dependency` or `devDependency` in the `package.json` file.

* Export an object with properties and methods that define the app's capabilities and functionality. This must be the main export of the NPM package.

Other than that, everything else is up to you. We don't impose any specific folder structure or file naming convention. You can build your app just as you would build any other NPM package.



Getting Started
---------------------
The [ShipEngine Integration Platform CLI](cli.md) makes it easy to get started with your app. It comes with built-in templates for each app type.
Just run the `shipengine new` command, answer a few questions, and it'll create all the files and pre-populate much of the basic scaffolding for you.

For more details, see [Creating Your First App](create-first-app.md).



Application Definition
---------------------
The main export of your app's NPM package must be an object that defines your app's capabilities and functionality.  The properties and methods of this object depend on the type of app you're building.

- For a [Carrier app](carrier-app/index.md), you should export a [Carrier Application Definition](reference/carrier.md).

- For an [Order app](order-app/index.md), you should export an [Order Application Definition](reference/order.md).

To make things even easier for you, your Application Definition object can be a [JSON](https://www.w3schools.com/js/js_json_intro.asp), [JSON5](https://json5.org/), [YAML](https://en.wikipedia.org/wiki/YAML), or [TypeScript](https://www.typescriptlang.org/) file in addition
to plain [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript). You can even split your app definition into many separate files if you want, and each file can be any of these file types.
You'll make this the main export by setting the `main` property of your `package.json` file to the path to your application definition file.


### Example
Here's an example of a [Carrier Application Definition](reference/carrier.md) that consists of multiple files in multiple formats.  The main file is in YAML format,
each of the [methods](#methods) are in separate JavaScript files, the [`connectionForm` and `settingsForm`](#forms) are in separate JSON files, and each of the [`deliveryServices`](#definitions) is in a separate YAML file.

```yaml
id: 55906eb1-8e2b-432a-81e7-53103bfc2886
name: Cargo Incorporated
description: Cargo Incorporated is the global leader in air cargo.
websiteURL: https://cargo-inc.net
logo: logo.svg
icon: icon.svg
connect: src/connect.js
createShipment: src/create-shipment.js
trackShipment: src/track-shipment.js

connectionForm: forms/connect.json
settingsForm: forms/settings.json

deliveryServices:
  - delivery-services/standard.yaml
  - delivery-services/economy.yaml
  - delivery-services/overnight.yaml
```

For more complete examples, see our [complete sample apps](https://github.com/ShipEngine/shipengine-integration-platform-sample-apps).

Methods
---------------------
As mentioned above, the main export of your application package must be an [Application Definition object](#application-definition), which has properties and methods.  The properties define your app's capabilities and features, but the methods provide your app's actual implementation, such as [logging in](reference/methods/connect.md), [creating a shipment](reference/methods/create-shipment.md), or [retrieving shipping rates](reference/methods/rate-shipment.md).
As you can imagine, the methods are probably where you'll spend most of your time when building an app.

Methods are just JavaScript functions that take input from the ShipEngine Integration Platform and return results to the platform.  What happens in-between those two is entirely up to you.  But, in general, most methods will consist of the following steps:

1) Transform the input data into whatever structure is needed by your API.

2) Call your API(s) to perform whatever operations are necessary and/or to retrieve whatever data was requested.

3) Transform the data from your API into the structure that's needed by the ShipEngine Integration Platform.

4) Return the data.

Forms
---------------------
[Forms](./reference/forms.md) are used gather data from an end-user that is interacting with your application from within on of our e-commerce applications.
For example, you will need to supply a [connection form](./reference/forms.md#connection-form-examples) that gathers login credentials
from the end user so they can be authenticated with your API. In the [example above](#example), you can see that the
path to the `connectionForm` is specified in the app definition.

Definitions
-------------------------
In addition to the [application definition](#application-definition), some application types, such as the [Carrier app](carrier-app/index.md), include definition files for the services it provides. For example, each type of delivery service
offered by a Carrier app will be described by a [Delivery Service Definition](./reference/delivery-service.md) file. In the application definition
[above](#example), you can see these definition files referenced in the `deliveryServices` array.

<div class="previous-next-nav">
  <a class="button button-small button-secondary" href="getting-started.md">Previous: Getting Started</a>
  <a class="button button-small button-secondary" href="./tools/index.md">Next: Recommended Tools</a>

  <!-- <a class="button button-small button-secondary" href="./app-types/index.md">Next: App Types</a> -->
</div>
