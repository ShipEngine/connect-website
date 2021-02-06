[![ShipEngine Connect](https://connect.shipengine.com/img/logos/shipengine-connect-logo.png)](https://connect.shipengine.com)

ShipEngine Connect Local Dev API
=======================================

[![Cross-Platform Compatibility](https://shipengine.github.io/img/badges/os-badges.svg)](https://github.com/ShipEngine/connect-local-dev-api/actions)
[![Build Status](https://github.com/ShipEngine/connect-local-dev-api/workflows/CI-CD/badge.svg)](https://github.com/ShipEngine/connect-local-dev-api/actions)

[![Dependencies](https://david-dm.org/ShipEngine/connect-local-dev-api.svg)](https://david-dm.org/ShipEngine/connect-local-dev-api)
[![npm](https://img.shields.io/npm/v/@shipengine/connect-local-dev-api.svg)](https://www.npmjs.com/package/@shipengine/connect-local-dev-api)
[![License](https://img.shields.io/npm/l/@shipengine/connect-local-dev-api.svg)](LICENSE)


<p><br></p>

> ### ⚠ WARNING: This is an internal package
> Using this package directly is discouraged and unsupported. Instead, you should install
> [**@shipengine/connect**](https://www.npmjs.com/package/@shipengine/connect) which uses this package under the hood.
> See [our documentation](https://connect.shipengine.com/docs/cli) for more information.

<p><br></p>


This package makes ShipEngine Connect apps callable via an API. It can be used as a standalone tool, or via the [ShipEngine Connect CLI](https://www.npmjs.com/package/@shipengine/connect-local-dev-api).


Usage
------------------------

```sh-session
$ npm install @shipengine/connect-local-dev-api
```

```javascript
"use strict";

const server = require("@shipengine/connect-local-dev-api")
  .default;

const pathToApp = process.argv[2];
const port = process.argv[3];

server(port, pathToApp);
```


Development
---------------------
The development server will start on [localhost:3000](http://localhost:3000) by default. It automatically detects file changes with [nodemon](https://www.npmjs.com/package/nodemon), and transpiles TypeScript on the fly using [ts-node](https://www.npmjs.com/package/ts-node).

*Note*: Make sure to edit `nodemon.json` so that the `exec` command points to the absolute path of the Connect App on your system.

```sh-session
$ npm run start:dev
```


Testing
---------------------
Test are written in TypeScript, and use [ts-node](https://www.npmjs.com/package/ts-node) to handle transpiling.

```sh-session
$ npm test
```


Releasing
-----------------------
To release a new version, use the command below.

```sh-session
npm run release
```

This will do the following:

- Display any outdated dependencies and prompt you to update them
- Run a security vulnerability audit
- Do a clean re-build
- Run all tests
- Run linter checks
- Prompt you for the version number to bump to
- Tag, commit, and push to GitHub

Once the commit is merged to the `master` branch, the [CI/CD script](.github/workflows/CI-CD.yaml) will publish it to NPM.
