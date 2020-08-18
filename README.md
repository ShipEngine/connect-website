# ShipEngine Connect Local Dev API

This package makes ShipEngine Connect apps callable via an API. It can be used as a standalone tool, or via the [ShipEngine Connect CLI](https://www.npmjs.com/package/@shipengine/connect-local-dev-api).

[![Cross-Platform Compatibility](https://shipengine.github.io/img/badges/os-badges.svg)](https://github.com/ShipEngine/connect-local-dev-api/actions)
[![Build Status](https://github.com/ShipEngine/connect-local-dev-api/workflows/CI-CD/badge.svg)](https://github.com/ShipEngine/connect-local-dev-api/actions)

[![npm](https://img.shields.io/npm/v/@shipengine/connect-local-dev-api.svg)](https://www.npmjs.com/package/@shipengine/connect-local-dev-api)
[![Dependencies](https://david-dm.org/ShipEngine/connect-local-dev-api.svg)](https://david-dm.org/ShipEngine/connect-local-dev-api)
[![License](https://img.shields.io/npm/l/@shipengine/connect-local-dev-api.svg)](LICENSE)


## Usage
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

## Development

The development server will start on [localhost:3000](http://localhost:3000) by default. It automatically detects file changes with [nodemon](https://www.npmjs.com/package/nodemon), and transpiles TypeScript on the fly using [ts-node](https://www.npmjs.com/package/ts-node).

```sh-session
$ npm start:dev
```

## Testing

Test are written in TypeScript, and use [ts-node](https://www.npmjs.com/package/ts-node) to handle transpiling.

```sh-session
$ npm test
```

## Releasing

In order to release the app, use the command below. This will prompt you to update your dependencies, bump the version, and will automatically tag, commit, and push the code to GitHub for you. Once CI passes on GitHub the code will be published to NPM.

```sh-session
$ npm run-script release
```