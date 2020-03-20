IPaaS Loader
==============================================
This library takes an IPaaS integration that may be broken up into various config components and bundles them together for testing and running in the IPaaS environment.


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
