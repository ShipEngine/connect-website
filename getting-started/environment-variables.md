---
title: Managing App Environment Variables
---

# Managing Environment Variables

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

## Set Environment Variables
This subcommand sets one or more environment variables.
```bash
shipengine-connect env:set NAME=value NAME_2=value2 ... NAME_N=valueN [OPTIONS]
```

## Get Environment Variables
This subcommand lists the current value for one or more environment variables.
```bash
shipengine-connect env:get NAME NAME_2 ... NAME_N [OPTIONS]
```

## List Environment Variables
This subcommand lists the values of all environment variables.
```bash
shipengine-connect env:list [OPTIONS]
```

## Unset Environment Variables
This subcommand unsets one or more environment variables.
```bash
shipengine-connect env:unset NAME NAME_2 ... NAME_N [OPTIONS]
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
