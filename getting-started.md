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
ShipEngine Platform Integration applications are NPM packages that export an object matching a certain structure. Please see [our application structure guide](./structure.md) as well as our
[sample apps](https://github.com/ShipEngine/shipengine-integration-platform-sample-apps) for more information.

Your app will run in our hosted Node.js runtime environment. We take care of hosting, scaling, and providing high-availability access to your application, so you can just focus on the core functionality.


Integration Platform SDK
------------------------------------------
The [ShipEngine Integration Platform SDK](https://github.com/ShipEngine/shipengine-integration-platform-sdk) has everything you need to quickly and efficiently build an integration application.
As a [TypeScript](https://www.typescriptlang.org/)-based project, it contains all of the type definitions for every resource that will be required for your project.


Javascript vs Typescript
------------------------
The ShipEngine Integration Platform gives you the flexibility to develop your integration application in either TypeScript or JavasScript as long as it matches the required [application structure](./structure.md).

The [ShipEngine Integration Platform SDK](sdk.md) is written in TypeScript and provides type definitions to help you build your app more easily. Many editors, such as [VSCode](https://code.visualstudio.com/) and [WebStorm](https://www.jetbrains.com/webstorm/), will automatically detect our type definitions and provide you with auto-completion and intellisense functionality — sometimes even if you're writing plain JavaScript.

Best of all, there's no need for a TypeScript compile step. [Our CLI](http://localhost:8080/docs/integration-platform/cli/) automatically transpiles your TypeScript to JavaScript when you test or publish your app.  One less step for you.


ShipEngine CLI
---------------
The [ShipEngine CLI](./cli.md) provides a variety of tools to aid you in your application development.

Use it to:
* [Scaffold a new application](create-first-app.md#create-new-project)
* [Test your application](testing/index.md)
* [Publish your application](publish.md)


<div class="previous-next-nav">
  <a class="button button-small button-secondary" href="index.md">Previous: Introduction</a>
  <a class="button button-small button-secondary" href="structure.md">Next: App Structure</a>

  <!-- <a class="button button-small button-secondary" href="./app-types/index.md">Next: App Types</a> -->
</div>
