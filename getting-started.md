---
hidden: true
title: Getting Started With Your ShipEngine Integration Platform Application
description: Learn how to begin developing your ShipEngine Integration Platform application
---

Getting Started
================

In order to add your service to the [ShipEngine Integration Platform](./index.md) and make it available within our suite of e-commerce applications,
you'll need to create a JavaScript application.

Our documentation assumes that you understand:
* Basic programming concepts
* How to use a terminal on your computer
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)/[NodeJS](https://nodejs.org/)
* [TypeScript](https://www.typescriptlang.org/) (_optional - you can use plain JavaScript_)

Integration Application
------------------------
ShipEngine Platform Integration applications are NPM packages that export an object matching a certain structure. Please see [our application structure guide](./structure.md) as well as our [sample apps](https://github.com/ShipEngine/shipengine-integration-platform-sample-apps) for more information.

Your app will run in our hosted Node.js runtime environment. We take care of hosting, scaling, and providing high-availability access to your application, so you can just focus on the core functionality.


Integration Platform SDK
------------------------------------------
The [ShipEngine Integration Platform SDK](https://www.npmjs.com/package/@shipengine/integration-platform-sdk) has everything you need to quickly and efficiently build an integration application. As a [TypeScript](https://www.typescriptlang.org/)-based project, it contains all of the type definitions for every resource that will be required for your project.


Integration Platform CLI
------------------------------------------
The [ShipEngine Integration Platform CLI](./cli.md) provides a variety of tools to aid you in your application development.

Use it to:
* [Scaffold a new application](create-first-app.md#create-new-project)
* [Test your application](testing/index.md)
* [Publish your application](publish.md)


Using Typescript
------------------------
The ShipEngine Integration Platform gives you the flexibility to develop your integration application in either TypeScript or JavasScript as long as it matches the required [application structure](./structure.md).

[Our SDK](sdk.md) is written in TypeScript and provides type definitions to help you build your app more easily. Many editors, such as [VSCode](https://code.visualstudio.com/) and [WebStorm](https://www.jetbrains.com/webstorm/), will automatically detect our type definitions and provide you with auto-completion and intellisense functionality — sometimes even if you're writing plain JavaScript.

[Our CLI](http://localhost:8080/docs/integration-platform/cli/) allows you to choose between JavaScript and TypeScript when you run the `shipengine init` command to [create a new app](create-first-app.md). Selecting TypeScript will generate `.ts` files that import the necessary type definitions from our SDK. It will also create a [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html), which allows you to adjust TypeScript's settings.

### Build Step Required
You will need to build your TypeScript before running commands such as `shipengine test` or `shipengine publish` to ensure that the command is using your latest code. To make this easier, we add the following scripts to your `package.json` file:

- **build**<br>
The "build" script compiles your TypeScript code to JavaScript so the ShipEngine Integration Platform can run it. You can run this script via `npm run build`. You can also customize the build script however you need, such as passing options to the compiler or add pre-build or post-build steps.

- **watch**<br>
The "watch" script runs the TypeScript compiler in ["watch mode"](https://www.typescriptlang.org/docs/handbook/configuring-watch.html), which automatically detects source code changes and does a fast, differential rebuild. Note that you'll need to leave your terminal window running, and you'll need to open a new terminal window to perform any other commands, such as `shipengine test`.



<div class="previous-next-nav">
  <a class="button button-small button-secondary" href="index.md">Previous: Introduction</a>
  <a class="button button-small button-secondary" href="structure.md">Next: App Structure</a>

  <!-- <a class="button button-small button-secondary" href="./app-types/index.md">Next: App Types</a> -->
</div>
