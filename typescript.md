---
hidden: true
title: Developing in TypeScript
description: Learn about TypeScript best practices for building ShipEngine Connect apps
---


# {{ title }}

[ShipEngine Connect](./index.md) gives you the flexibility to develop your integration application in either TypeScript or JavasScript as long as it matches the required [application structure](./structure.md).

[Our SDK](./sdk.md) is written in TypeScript and provides type definitions to help you build your app more easily. Many editors, such as [VSCode](https://code.visualstudio.com/) and [WebStorm](https://www.jetbrains.com/webstorm/), will automatically detect our type definitions and provide you with auto-completion and intellisense functionality — sometimes even if you're writing plain JavaScript.

[Our CLI](./cli.md) allows you to choose between JavaScript and TypeScript when you run the [`connect init` command](./cli.md#initialize-a-new-app) to [create a new app](./create-first-app.md). Selecting TypeScript will generate `.ts` files that import the necessary type definitions from our SDK. It will also create a [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html), which allows you to adjust TypeScript's settings.

### Build Step Required
You will need to build your TypeScript before running commands such as `connect test` or `connect publish` to ensure that the command is using your latest code. To make this easier, we add the following scripts to your `package.json` file:

- **build**<br>
The "build" script compiles your TypeScript code to JavaScript so ShipEngine Connect can run it. You can run this script via `npm run build`. You can also customize the build script however you need, such as passing options to the compiler or add pre-build or post-build steps.

- **watch**<br>
The "watch" script runs the TypeScript compiler in ["watch mode"](https://www.typescriptlang.org/docs/handbook/configuring-watch.html), which automatically detects source code changes and does a fast,
differential rebuild. Note that you'll need to leave your terminal window running, and you'll need to open a new terminal window to perform any other commands, such as [`connect test`](./cli.md#test-your-app).


<div class="previous-next-nav">
  <a class="button button-small button-secondary" href="./implementation.md">Previous: Implementing Your Methods</a>
  <a class="button button-small button-secondary" href="./error-handling.md">Next: Error Handling</a>
</div>
