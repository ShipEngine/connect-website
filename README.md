[![ShipEngine Connect](https://connect.shipengine.com/img/logos/shipengine-connect-logo.png)](https://connect.shipengine.com)

# ShipEngine Connect CLI

[![Cross-Platform Compatibility](https://shipengine.github.io/img/badges/os-badges.svg)](https://github.com/ShipEngine/connect-cli/actions)
[![Build Status](https://github.com/ShipEngine/connect-cli/workflows/CI-CD/badge.svg)](https://github.com/ShipEngine/connect-cli/actions)

[![Coverage Status](https://coveralls.io/repos/github/ShipEngine/connect-cli/badge.svg?branch=master)](https://coveralls.io/github/ShipEngine/connect-cli)
[![Dependencies](https://david-dm.org/ShipEngine/connect-cli.svg)](https://david-dm.org/ShipEngine/connect-cli)
[![npm](https://img.shields.io/npm/v/@shipengine/connect-cli.svg)](https://www.npmjs.com/package/@shipengine/connect-cli)
[![License](https://img.shields.io/npm/l/@shipengine/connect-cli.svg)](LICENSE)


<p><br></p>

> ### ⚠ WARNING: This is an internal package
> Using this package directly is discouraged and unsupported. Instead, you should install
> [**@shipengine/connect**](https://www.npmjs.com/package/@shipengine/connect) which uses this package under the hood.
> See [our documentation](https://connect.shipengine.com/docs/cli) for more information.

<p><br></p>


<!-- toc -->
* [ShipEngine Connect CLI](#shipengine-connect-cli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @shipengine/connect-cli
$ connect COMMAND
running command...
$ connect (-v|--version|version)
@shipengine/connect-cli/2.14.0 linux-x64 node-v14.15.0
$ connect --help [COMMAND]
USAGE
  $ connect COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`connect apps`](#connect-apps)
* [`connect env:get NAME-1 ... NAME-N`](#connect-envget-name-1--name-n)
* [`connect env:list`](#connect-envlist)
* [`connect env:set NAME-1=VALUE ... NAME-N=VALUE`](#connect-envset-name-1value--name-nvalue)
* [`connect env:unset NAME-1 ... NAME-N`](#connect-envunset-name-1--name-n)
* [`connect help [COMMAND]`](#connect-help-command)
* [`connect info`](#connect-info)
* [`connect init [PATH]`](#connect-init-path)
* [`connect login`](#connect-login)
* [`connect logout`](#connect-logout)
* [`connect logs`](#connect-logs)
* [`connect pack`](#connect-pack)
* [`connect publish`](#connect-publish)
* [`connect start`](#connect-start)
* [`connect test`](#connect-test)
* [`connect whoami`](#connect-whoami)

## `connect apps`

List your apps

```
USAGE
  $ connect apps

OPTIONS
  -h, --help  Show help for the apps commands
```

_See code: [src/commands/apps.ts](https://github.com/ShipEngine/connect-cli/blob/v2.14.0/src/commands/apps.ts)_

## `connect env:get NAME-1 ... NAME-N`

Get environment variables for an app

```
USAGE
  $ connect env:get NAME-1 ... NAME-N

ARGUMENTS
  NAME-1 ... NAME-N  the environment variable name(s). e.g. FOO (note: name will always be UPPERCASED)

OPTIONS
  -h, --help  show help for the env command

ALIASES
  $ connect get
```

_See code: [src/commands/env/get.ts](https://github.com/ShipEngine/connect-cli/blob/v2.14.0/src/commands/env/get.ts)_

## `connect env:list`

List environment variables for an app

```
USAGE
  $ connect env:list

OPTIONS
  -f, --format=table|dotenv  [default: table] specify output format
  -h, --help                 show help for the env command
```

_See code: [src/commands/env/list.ts](https://github.com/ShipEngine/connect-cli/blob/v2.14.0/src/commands/env/list.ts)_

## `connect env:set NAME-1=VALUE ... NAME-N=VALUE`

Set environment variables for an app

```
USAGE
  $ connect env:set NAME-1=VALUE ... NAME-N=VALUE

ARGUMENTS
  NAME-1=VALUE ... NAME-N=VALUE  the environment variable(s) name=value. e.g. FOO=bar (note: name will always be
                                 UPPERCASED)

OPTIONS
  -h, --help  show help for the env command

ALIASES
  $ connect set
```

_See code: [src/commands/env/set.ts](https://github.com/ShipEngine/connect-cli/blob/v2.14.0/src/commands/env/set.ts)_

## `connect env:unset NAME-1 ... NAME-N`

Unset (delete) environment variables from an app

```
USAGE
  $ connect env:unset NAME-1 ... NAME-N

ARGUMENTS
  NAME-1 ... NAME-N  the environment variable name(s). e.g. FOO (note: name will always be UpperCased)

OPTIONS
  -h, --help  show help for the env command

ALIASES
  $ connect unset
```

_See code: [src/commands/env/unset.ts](https://github.com/ShipEngine/connect-cli/blob/v2.14.0/src/commands/env/unset.ts)_

## `connect help [COMMAND]`

display help for connect

```
USAGE
  $ connect help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `connect info`

Get the current information about your app

```
USAGE
  $ connect info

OPTIONS
  -h, --help  Show help for the info command
```

_See code: [src/commands/info.ts](https://github.com/ShipEngine/connect-cli/blob/v2.14.0/src/commands/info.ts)_

## `connect init [PATH]`

Create a new package to develop a custom ShipEngine app

```
USAGE
  $ connect init [PATH]

ARGUMENTS
  PATH  Path to new package (defaults to current directory)

OPTIONS
  -f, --force  Overwrite existing files
  -h, --help   Show help for the new command
  -y, --yes    Skips the questions and uses the defaults (carrier|Javascript|yaml)

ALIASES
  $ connect new

EXAMPLE
  $ connect init
```

_See code: [src/commands/init.ts](https://github.com/ShipEngine/connect-cli/blob/v2.14.0/src/commands/init.ts)_

## `connect login`

Login with your connect API key

```
USAGE
  $ connect login

OPTIONS
  -h, --help  Show help for the login command

ALIASES
  $ connect login
```

_See code: [src/commands/login.ts](https://github.com/ShipEngine/connect-cli/blob/v2.14.0/src/commands/login.ts)_

## `connect logout`

Clears the local connect API key

```
USAGE
  $ connect logout

OPTIONS
  -h, --help  Show help for the auth:logout command

ALIASES
  $ connect logout
```

_See code: [src/commands/logout.ts](https://github.com/ShipEngine/connect-cli/blob/v2.14.0/src/commands/logout.ts)_

## `connect logs`

Get the logs for your app

```
USAGE
  $ connect logs

OPTIONS
  -a, --all                 Show internal logs along with the app developer related ones
  -f, --format=default|raw  [default: default] The format the logs get shown in
  -h, --help                Show help for the logs command
  -l, --lines=lines         [default: 500] The number of lines of logs to show from the server, max of 1500
```

_See code: [src/commands/logs.ts](https://github.com/ShipEngine/connect-cli/blob/v2.14.0/src/commands/logs.ts)_

## `connect pack`

Package your app

```
USAGE
  $ connect pack

OPTIONS
  -h, --help  Show help for the pack command

EXAMPLE
  $ connect pack
```

_See code: [src/commands/pack.ts](https://github.com/ShipEngine/connect-cli/blob/v2.14.0/src/commands/pack.ts)_

## `connect publish`

Packages and publishes your app to the dev server

```
USAGE
  $ connect publish

OPTIONS
  -h, --help        Show help for the publish command
  -n, --no-watch    Does not track the status of the deployment
  -s, --skip-tests  Skip running the test before publishing

EXAMPLE
  $ connect publish
```

_See code: [src/commands/publish.ts](https://github.com/ShipEngine/connect-cli/blob/v2.14.0/src/commands/publish.ts)_

## `connect start`

Start a local web server to develop your app interactively

```
USAGE
  $ connect start

OPTIONS
  -h, --help       Show help for the start commands
  -p, --port=port  [default: 3000] The port that the app will run on
```

_See code: [src/commands/start.ts](https://github.com/ShipEngine/connect-cli/blob/v2.14.0/src/commands/start.ts)_

## `connect test`

Test your app

```
USAGE
  $ connect test

OPTIONS
  -d, --debug            Logs additional debug information
  -f, --fail-fast        Stop running the test suite on the first failed test
  -g, --grep=grep        Only run test that match the given string
  -h, --help             Show help for the test command
  -r, --retries=retries  Specify the retries for all the test
  -t, --timeout=timeout  Specify the timeout for all the test

EXAMPLES
  $ connect test
  $ connect test --grep rateShipment
```

_See code: [src/commands/test.ts](https://github.com/ShipEngine/connect-cli/blob/v2.14.0/src/commands/test.ts)_

## `connect whoami`

Display the current logged in user

```
USAGE
  $ connect whoami

OPTIONS
  -h, --help  Show help for the whoami command

ALIASES
  $ connect whoami
```

_See code: [src/commands/whoami.ts](https://github.com/ShipEngine/connect-cli/blob/v2.14.0/src/commands/whoami.ts)_
<!-- commandsstop -->
