ShipEngine IPaaS App Loader
==============================================


[![Cross-Platform Compatibility](https://shipengine.github.io/img/badges/os-badges.svg)](https://github.com/ShipEngine/shipengine-ipaas-loader/blob/master/.github/workflows/CI-CD.yaml)
[![Build Status](https://github.com/ShipEngine/shipengine-ipaas-loader/workflows/CI-CD/badge.svg)](https://github.com/ShipEngine/shipengine-ipaas-loader/blob/master/.github/workflows/CI-CD.yaml)

[![Coverage Status](https://coveralls.io/repos/github/ShipEngine/shipengine-ipaas-loader/badge.svg?branch=master)](https://coveralls.io/github/ShipEngine/shipengine-ipaas-loader)
[![Dependencies](https://david-dm.org/ShipEngine/shipengine-ipaas-loader.svg)](https://david-dm.org/ShipEngine/shipengine-ipaas-loader)

[![npm](https://img.shields.io/npm/v/@shipengine/ipaas-loader.svg)](https://www.npmjs.com/package/@shipengine/ipaas-loader)
[![License](https://img.shields.io/npm/l/@shipengine/ipaas-loader.svg)](LICENSE)


This library loads a ShipEngine IPaaS app from an NPM package. Regardless of whether the app is written in JavaScript, TypeScript, JSON, YAML, or a mix of them all, the loader reads those files, validates them, and returns a normalized structure.



Example
--------------------------

```typescript
import ipaasLoader from "@shipengine/ipaas-loader";

async function printAppInfo() {
  let app = await ipaasLoader.loadApp("/path/to/the/app");
  console.log(`Successfully loaded ${app.name} v${app.version}`);
}

printAppInfo();
```



Installation
--------------------------
You can install the ShipEngine IPaaS App Loader via [npm](https://docs.npmjs.com/about-npm/).

```bash
npm install @shipengine/ipaas-loader
```
