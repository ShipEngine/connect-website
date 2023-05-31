---
title: Upgrade from v2 to v4
---

# Upgrading from v2 to v4

Because the basic structure of Connect apps did not change between versions v2 and v4, upgrading should be simple in most cases.

## Update package.json

1. Update any Connect related package to `4.0.0` or newer and to add `@shipengine/connect-local` as a dev dependency. This package provides the test server and other functionality for running and testing a Connect app locally.

2. Ensure that the `package.json` has a valid `main` property that points to the entry point of the app. For Typescript apps created by the CLI, this will be `lib/index.js`. For Javascript, it would be `src/index.js`.

3. Add a new top-level connect attribute to package.json, with a version property set to 3:

```json
{
  "connect": {
    "version": 4
  }
}
```

4. Update the `start` script in `package.json` to use the local test server:

```json
"start": "connect-local ."
```

Here is an example of a `package.json` with all the changes:

```json
{
  "name": "example-carrier-api",
  "version": "1.0.0",
  "appId": "<< APP ID GUID >>",
  "connect": {
    "version": 4
  },
  "dependencies": {
    "@shipengine/connect-carrier-api": "^4.0.0",
    "@shipengine/connect-runtime": "^4.0.0"
  },
  "devDependencies": {
    "@shipengine/connect-local": "^4.0.0"
  },
  "main": "src/index.js",
  "scripts": {
    "start": "connect-local ."
  }
}
```

## File changes

In v2, the CLI would create an `src/index.ts` file that would export an initialized Connect app that looked like this:

```typescript
import { CarrierApp } from "@shipengine/connect-carrier-api";
import { Register, CreateLabel } from "./methods";
import { Metadata } from "./definitions";

export default new CarrierApp({
  Metadata,
  Register,
  CreateLabel,
});
```

This file should no longer export the instantiated app, but instead just export the data needed to make up the app. After upgrading, the above file should now look like this:

```typescript
import type { CarrierAppDefinition } from '@shipengine/connect-carrier-api';
import { Register, CreateLabel } from './methods';
import { Metadata } from './definitions';

export default {
  Metadata,
  Register,
  CreateLabel,
} satisfies CarrierAppDefinition;
```

If you are using Javascript, the type information would be omitted.

Finally, if you have a `src/serve.ts` or `src/serve.js` file that looks like the following, you can remove it.

```Typescript
import { start } from '@shipengine/connect-runtime';
import app from './';

start(app);
```

If you have this file and it includes more code than that, you'll need to figure out whether the logic is still needed and move it to a more appropriate place.
