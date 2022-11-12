# Environment Variables
For the flexibility of deploying your code to ShipEngine Connects testing environment and our production systems it is recommended that you use environment variables for things that should change between environments. 

For example:
- An API endpoint often changes between a third parties test api and their production api
    - Production: https://www.thirdparty.com/api
    - Testing: https://www.sandbox.thirdparty.com/api

## Test Environment

:::success Publishing
Environment variables will only be updated in the ShipEngine Connect testing environment when an application is published.
:::
### Set
You can use the connect cli command `env:set`
```bash
$ connect env:set API_URL=https://www.sandbox.thirdparty.com/api API_KEY=3435dfafa32424
## Output
API_URL=https://www.sandbox.thirdparty.com/api has been set
API_KEY=3435dfafa32424 has been set
```
### List
You can use the connect cli command `env:list` to get a list of all currently set environment variables.

```bash
$ connect env:list
## Output
API_URL=https://www.sandbox.thirdparty.com/api
API_KEY=3435dfafa32424
```

### Get
You can use the connect cli command `env:get` to retrieve the current value of an environment variable.
```bash
$ connect env:get API_URL
## Output
┌─────────────┬───────┐
│ Name        │ Value │
├─────────────┼───────┤
│ API_URL     │ foo   │
└─────────────┴───────┘
```

### Remove
You can use the connect cli command `env:unset` command to remove any unwanted environment variables.

```bash
$ connect env:unset API_URL
## Output
API_URL has been removed as an environment variable.
```

## Recommendations

We typically recommend having a single file in your project where you access your enviornment variables. This could be a `constants.ts` file, and we recommend having preset values that default to staging variables.

**Example**

```TypeScript constants.ts
export const API_URL = process.env.API_URL ?? 'https://www.sandbox.thirdparty.com/api';
```
```TypeScript consumer.ts
import { API_URL } from './constants'

```

## Production
We recommend when reaching out to the [ShipEngine Connect Team](mailto:connect@shipengine.com) to have your application moved into our production systems, that you also notify them of any environment variables that will need to be set, and what their values should be in both testing and production environments.
