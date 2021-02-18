[![ShipEngine Connect](https://connect.shipengine.com/img/logos/shipengine-connect-logo.png)](https://connect.shipengine.com)

ShipEngine Connect SDK
==============================================

> ### ⚠ WARNING: This is an internal package
> Using this package directly is discouraged and unsupported. Instead, you should install
> [**@shipengine/connect**](https://www.npmjs.com/package/@shipengine/connect) which uses this package under the hood.
> See [our documentation](https://connect.shipengine.com/docs/cli) for more information.

<p><br></p>


This library contains TypeScript type definitions for ShipEngine Connect app developers, as well as internal classes, functions, etc. that's used by the ShipEngine Connect platform for testing, validation, and runtime.



Local Development
--------------------------
To build/test the library locally on your computer:

1. __Install dependencies__<br>
`yarn`

2. __Run the build script__<br>
`yarn build` or `yarn watch`

3. __Run the tests__<br>
`yarn test`



Releasing
--------------------------
To release a new version of the SDK, use the command below.

```bash
yarn release
```

This will do the following:

- Display any outdated dependencies and prompt you to update them
- Run a security vulnerability audit
- Do a clean re-build
- Run all tests
- Run linter checks
- Prompt you for the version number to bump to
- Tag, commit, and push to GitHub

Once the commit is merged to the `master` branch, the [CI/CD script](../../.github/workflows/build.yaml) will publish it to NPM.
