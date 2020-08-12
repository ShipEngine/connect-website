---
hidden: true
title: ShipEngine Integration Platform CLI
description: The ShipEngine Integration Platform provides a powerful command-line tool to make it easier to create, run, and test your app.
tags:
- CLI
- command-line interface
- terminal
- console
- NPM
---

Integration Platform CLI
=====================================
The [ShipEngine Integration Platform CLI](https://www.npmjs.com/package/@shipengine/integration-platform-cli) is a powerful tool that makes it easier for you to create, run, test, and publish your application.


Prerequisites
------------------------

**Node v10+**<br>
You'll need [NodeJS](https://nodejs.org) version 10.0.0 or greater.  You can verify your installed Node version using `node --version`.

**NPM v6+**<br>
Node comes with [npm](https://www.npmjs.com/). Verify that you have version 6.0.0 or greater by running `npm --version`.


Installation
------------------------
To install the ShipEngine Integration Platform CLI, run the following command from your terminal:

```
npm install --global @shipengine/integration-platform-cli
```

Verify that the CLI was installed correctly:

```
shipengine --version
```


Initialize a New App
--------------------------
Use the `shipengine init` command to start building a new application. Rather than starting from scratch, this command will prompt you for information about your app and coding preferences and will then generate all the inital scaffolding for you. For more details, see [Creating Your First App](create-first-app.md).

```
shipengine init [OPTIONS] [PATH]
```

#### Options

##### `--yes`
This option will bypass all the prompts and just use the default values. This is an easy way to quickly create a new app.

##### `--force`
This option will overwrite existing files in the output directory without prompting. Use caution with this option.

#### Arguments

##### `path`
By default, the `shipengine init` command will create a new app in the current directory, but you can optionally specify a different path. For example, `shipengine init my-new-app` will create the app in a new sub-directory named "my-new-app".


Run Your App Locally
--------------------------
The `shipengine start` command starts a local server that allows you to invoke your app's methods using [our Postman collection](#coming-soon). The server monitors your source code and automatically reloads your app whenever changes are detected, so if you find a bug, you can fix it and immediately retry.

> **PRO TIP:** You can use the [VSCode debugger](https://code.visualstudio.com/docs/editor/debugging) to set breakpoints, step through your code line-by-line, and inspect variables at runtime. Just press `F5` to start a debug session.

```
shipengine start [OPTIONS]
```

#### Options

##### `--port <number>`
The local server runs on port 3000 by default, but you can use this option to change the port number.


Test Your App
--------------------------
The `shipengine test` command runs our end-to-end test suite against your app to confirm that it behaves as expected. These tests emulate real-world workflows that your app will experience in production, and you should make sure your app passes before publishing it.

> **NOTE:** We also encourage you to [unit test your app](testing/index.md#unit-testing) in addition to these end-to-end tests.

```
shipengine test [OPTIONS]
```

#### Options

##### `--debug`
This option enables verbose logging, which can be useful for debugging test failures.

##### `--fail-fast`
This option aborts the test run as soon as one test fails, rather than continuing to run the rest of the tests.

##### `--grep <filter>`
To run a specific test or set of tests, use the `--grep` option and specify a substring or regular expression. Only tests whose names contain the substring or match the regular expression will be run.

##### `--retries <number>`
You can opt to retry failed tests, which can be convenient for flaky tests or intermittent network errors.

##### `--timeout <number>`
Use this option to allow more time for your tests to run. The timeout is specified in milliseconds.


Publish Your App
--------------------------
When you're ready to see your app live on the ShipEngine Integration Platform, run the `shipengine publish` command. This will publish your app to our development environment for further testing and approval.  For more details see [Publishing Your Application](publish.md).

```
shipengine publish [OPTIONS]
```

#### Options

##### `--skip-tests`
We normally run your app through our end-to-end test suite to confirm that it functions correctly before publishing it. You can skip the tests using this option.

##### `--watch`
Publishing can take a minute or two. Use this option to show a progress indicator and a confirmation of whether the app was published successfully or failed.  If you don't use the `--watch` option, then you can run the `shipengine info` command to check the status of your app deployment.


View App Info
--------------------------
This command shows information about your app, such as its ID, deployed version, deployment status, etc.

```
shipengine info
```

There are no options for this command.



<div class="previous-next-nav">
  <a class="button button-small button-secondary" href="./tools/index.md">Previous: Recommended Tools</a>
  <a class="button button-small button-secondary" href="./create-first-app.md">Next: Creating Your First App</a>
</div>
