[![ShipEngine Connect](https://connect.shipengine.com/img/logos/shipengine-connect-logo.png)](https://connect.shipengine.com)

ShipEngine Connect Local Dev UI
=======================================

[![npm](https://img.shields.io/npm/v/@shipengine/connect-local-dev-ui.svg)](https://www.npmjs.com/package/@shipengine/connect-local-dev-ui)
[![License](https://img.shields.io/npm/l/@shipengine/connect-local-dev-ui.svg)](LICENSE)
[![Dependencies](https://david-dm.org/ShipEngine/connect-local-dev-ui.svg)](https://david-dm.org/ShipEngine/connect-local-dev-ui)
[![Cross-Platform Compatibility](https://shipengine.github.io/img/badges/os-badges.svg)](https://github.com/ShipEngine/connect-local-dev-ui/actions)
[![Build Status](https://github.com/ShipEngine/connect-local-dev-ui/workflows/CI-CD/badge.svg)](https://github.com/ShipEngine/connect-local-dev-ui/actions)


<p><br></p>

> ### ⚠ WARNING: This is an internal package
> Using this package directly is discouraged and unsupported. Instead, you should install
> [**@shipengine/connect**](https://www.npmjs.com/package/@shipengine/connect) which uses this package under the hood.
> See [our documentation](https://connect.shipengine.com/docs/cli) for more information.

<p><br></p>


This package provides a web interface for interacting with [ShipEngine Connect](https://connect.shipengine.com) apps on a local dev machine.


Development
---------------------

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



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
