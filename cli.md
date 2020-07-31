---
title: Install the ShipEngine CLI
description: Learn how to install the ShipEngine CLI.
tags:
- CLI
- ShipEngine
- NodeJS
- NPM
---

Installing the ShipEngine CLI
==================
The [ShipEngine CLI](https://github.com/ShipEngine/shipengine-integration-platform-cli/#commands) is the tool you'll use to create your [ShipEngine Integration Platform](./index.md) application, test your application,
and deploy your application to the ShipEngine Integration Platform for further testing and hosting.


Requirements
------------
Install [NodeJS](https://nodejs.org) version 10 or greater per the site's instructions. Likewise, you can use other package managers, such as [HomeBrew](https://brew.sh/) on macOS or Linux and
[Chocolatey](https://chocolatey.org/) for Windows.

Verify that [npm](https://www.npmjs.com/) was installed successfully along with NodeJS by running the following command: `npm -v`.

Installation
-------------
To install the ShipEngine CLI, run the following command from your terminal:
`npm install @shipengine/integration-platform-cli -g`

Verify that the CLI was installed correctly:
`shipengine -v`

<div class="previous-next-nav">
  <a class="button button-small button-secondary" href="./tools/index.md">Previous: Recommended Tools</a>
  <a class="button button-small button-secondary" href="./create-first-app.md">Next: Creating Your First App</a>
</div>
