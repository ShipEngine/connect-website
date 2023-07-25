---
title: Managing Configuration
---

# Managing Configuration

The `shipengine-connect env` command allows you to set environment variables that
will be available to your app once it is published to ShipEngine Connect. This
allows you to manage application secrets and configuration data separately from
your code and make changes to this data without changing your application code.

You should run this command before [publishing](/getting-started/publishing/) your app.
The values that are set at the time you run the publish command will be injected
into your app once it is hosted in ShipEngine Connect. If you change those
variables, you will need to re-publish your app before those changes will take
effect in ShipEngine Connect.

When you run the `shipengine-connect env` command, you will include one of its
subcommands listed below to indicate which environment variable action you would
like to perform.

## Commands

### Set Environment Variables
This subcommand sets one or more environment variables.

`shipengine-connect env:set NAME=value NAME_2=value2 ... NAME_N=valueN [OPTIONS]`

Example:

```bash
shipengine-connect env:set API_URL=https://www.sandbox.example.com/api API_KEY=3435dfafa32424
```

Output:

```
API_URL=https://www.sandbox.example.com/api has been set
API_KEY=3435dfafa32424 has been set
```

### List Environment Variables
This subcommand lists the values of all environment variables.

`shipengine-connect env:list [OPTIONS]`

Example:

```bash
shipengine-connect env:list
```

### Get Environment Variables
This subcommand lists the current value for one or more environment variables.

`shipengine-connect env:get NAME NAME_2 ... NAME_N [OPTIONS]`

Example:

```bash
shipengine-connect env:get API_URL
```

### Unset Environment Variables
This subcommand unsets one or more environment variables.

`shipengine-connect env:unset NAME NAME_2 ... NAME_N [OPTIONS]`

Example:

```bash
shipengine-connect env:unset API_URL
```

## Options

###### `--debug`
This option enables verbose logging, which can be useful for debugging issues
managing variables.

###### `--format`
This option formats the output of the `shipengine-connect list` command. Set
this option to `table` to list the environment variables in a table format or
`dotenv` to list the environment variables in the
[dotenv](https://www.npmjs.com/package/dotenv) format.

## Recommendations

### Single File
We typically recommend having a single file in your project where you access your enviornment variables. This could be a `constants.ts` file, and we recommend having preset values that default to staging variables.

**Example**

```TypeScript constants.ts
export const API_URL = process.env.API_URL ?? 'https://www.sandbox.example.com/api';
```
```TypeScript consumer.ts
import { API_URL } from './constants'

```

### Moving to Production
We recommend when reaching out to the [ShipEngine Connect Team](mailto:connect@shipengine.com) to have your application moved into our production systems, that you also notify them of any environment variables that will need to be set, and what their values should be in both testing and production environments.

