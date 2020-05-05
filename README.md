ShipEngine Integration Platform App Loader
==============================================


[![Cross-Platform Compatibility](https://shipengine.github.io/img/badges/os-badges.svg)](https://github.com/ShipEngine/shipengine-integration-platform-loader/actions)
[![Build Status](https://github.com/ShipEngine/shipengine-integration-platform-loader/workflows/CI-CD/badge.svg)](https://github.com/ShipEngine/shipengine-integration-platform-loader/actions)

[![Coverage Status](https://coveralls.io/repos/github/ShipEngine/shipengine-integration-platform-loader/badge.svg?branch=master)](https://coveralls.io/github/ShipEngine/shipengine-integration-platform-loader)
[![Dependencies](https://david-dm.org/ShipEngine/shipengine-integration-platform-loader.svg)](https://david-dm.org/ShipEngine/shipengine-integration-platform-loader)

[![npm](https://img.shields.io/npm/v/@shipengine/integration-platform-loader.svg)](https://www.npmjs.com/package/@shipengine/integration-platform-loader)
[![License](https://img.shields.io/npm/l/@shipengine/integration-platform-loader.svg)](LICENSE)


This library loads a [**ShipEngine Integration Platform app**](https://www.shipengine.com/docs/integration-platform/) from an NPM package. Regardless of whether the app is written in JavaScript, TypeScript, JSON, YAML, or a mix of them all, the loader reads those files, validates them, and returns a normalized structure.



Example
--------------------------

```typescript
import loader from "@shipengine/integration-platform-loader";

async function printAppInfo() {
  let app = await loader.loadApp("/path/to/the/app");
  console.log(`Successfully loaded ${app.name} v${app.version}`);
}

printAppInfo();
```



Installation
--------------------------
You can install the ShipEngine Integration Platform App Loader via [npm](https://docs.npmjs.com/about-npm/).

```bash
npm install @shipengine/integration-platform-loader
```
