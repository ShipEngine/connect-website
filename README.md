IPaaS Loader
==============================================
This library takes an IPaaS integration that may be broken up into various config components and bundles them together for testing and running in the IPaaS environment.


[![Cross-Platform Compatibility](https://shipengine.github.io/img/badges/os-badges.svg)](https://github.com/ShipEngine/shipengine-ipaas-loader/blob/master/.github/workflows/CI-CD.yaml)
[![Build Status](https://github.com/ShipEngine/shipengine-ipaas-loader/workflows/CI-CD/badge.svg)](https://github.com/ShipEngine/shipengine-ipaas-loader/blob/master/.github/workflows/CI-CD.yaml)

[![Coverage Status](https://coveralls.io/repos/github/ShipEngine/shipengine-ipaas-loader/badge.svg?branch=master)](https://coveralls.io/github/ShipEngine/shipengine-ipaas-loader)
[![Dependencies](https://david-dm.org/ShipEngine/shipengine-ipaas-loader.svg)](https://david-dm.org/ShipEngine/shipengine-ipaas-loader)

[![npm](https://img.shields.io/npm/v/@shipengine/ipaas-loader.svg)](https://www.npmjs.com/package/@shipengine/ipaas-loader)
[![License](https://img.shields.io/npm/l/@shipengine/ipaas-loader.svg)](LICENSE)


Example
--------------------------

```typescript
import ipaasLoader from "@shipengine/ipaas-loader";

// Returns fully dereferenced config module.
const ipaasModule = ipaasLoader("relative-path-to-ipaas-integration");
```



Installation
--------------------------
You can install IPaaS Loader via [npm](https://docs.npmjs.com/about-npm/).

```bash
npm install @shipengine/ipaas-loader
```

Contributing
--------------------------
Contributions, enhancements, and bug-fixes are welcome!  [File an issue](https://github.com/ShipEngine/shipengine-ipaas-loader/issues) on GitHub and [submit a pull request](https://github.com/ShipEngine/shipengine-ipaas-loader/pulls).

#### Building
To build the project locally on your computer:

1. __Clone this repo__<br>
`git clone https://github.com/ShipEngine/shipengine-ipaas-loader.git`

2. __Install dependencies__<br>
`npm install`

3. __Build the code__<br>
`npm run build`

4. __Run the tests__<br>
`npm test`
