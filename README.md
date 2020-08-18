# ShipEngine Connect CLI

### Command-line tool for building [ShipEngine Connect](https://connect.shipengine.com/docs/) apps

[![Cross-Platform Compatibility](https://shipengine.github.io/img/badges/os-badges.svg)](https://github.com/ShipEngine/connect-cli/actions)
[![Build Status](https://github.com/ShipEngine/connect-cli/workflows/CI-CD/badge.svg)](https://github.com/ShipEngine/connect-cli/actions)
[![Coverage Status](https://coveralls.io/repos/github/ShipEngine/connect-cli/badge.svg?branch=master)](https://coveralls.io/github/ShipEngine/connect-cli)

[![npm](https://img.shields.io/npm/v/@shipengine/connect-cli.svg)](https://www.npmjs.com/package/@shipengine/connect-cli)
[![Dependencies](https://david-dm.org/ShipEngine/connect-cli.svg)](https://david-dm.org/ShipEngine/connect-cli)
[![License](https://img.shields.io/npm/l/@shipengine/connect-cli.svg)](LICENSE)

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
@shipengine/connect-cli/1.0.9 linux-x64 node-v12.18.1
$ connect --help [COMMAND]
USAGE
  $ connect COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`connect help [COMMAND]`](#connect-help-command)
* [`connect info`](#connect-info)
* [`connect init [PATH]`](#connect-init-path)
* [`connect login`](#connect-login)
* [`connect logout`](#connect-logout)
* [`connect pack`](#connect-pack)
* [`connect publish`](#connect-publish)
* [`connect start`](#connect-start)
* [`connect test`](#connect-test)
* [`connect whoami`](#connect-whoami)

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

list info for an app

```
USAGE
  $ connect info

OPTIONS
  -h, --help  show help for the info command
```

_See code: [src/commands/info.ts](https://github.com/ShipEngine/connect-cli/blob/v1.0.9/src/commands/info.ts)_

## `connect init [PATH]`

create a new package to develop a custom ShipEngine app

```
USAGE
  $ connect init [PATH]

ARGUMENTS
  PATH  path to new package (defaults to current directory)

OPTIONS
  -f, --force  overwrite existing files
  -h, --help   show help for the new command
  -y, --yes    skips the questions and uses the defaults (carrier|Javascript|yaml)

ALIASES
  $ connect new

EXAMPLE
  $ connect init
```

_See code: [src/commands/init.ts](https://github.com/ShipEngine/connect-cli/blob/v1.0.9/src/commands/init.ts)_

## `connect login`

login with your connect API key

```
USAGE
  $ connect login

OPTIONS
  -h, --help  show help for the auth:login command

ALIASES
  $ connect login
```

_See code: [src/commands/login.ts](https://github.com/ShipEngine/connect-cli/blob/v1.0.9/src/commands/login.ts)_

## `connect logout`

clears the local connect API key

```
USAGE
  $ connect logout

OPTIONS
  -h, --help  show help for the auth:logout command

ALIASES
  $ connect logout
```

_See code: [src/commands/logout.ts](https://github.com/ShipEngine/connect-cli/blob/v1.0.9/src/commands/logout.ts)_

## `connect pack`

package your app

```
USAGE
  $ connect pack

OPTIONS
  -h, --help  show help for the pack command

EXAMPLE
  $ connect pack
```

_See code: [src/commands/pack.ts](https://github.com/ShipEngine/connect-cli/blob/v1.0.9/src/commands/pack.ts)_

## `connect publish`

publish your app

```
USAGE
  $ connect publish

OPTIONS
  -h, --help        show help for the publish command
  -n, --no-watch    does not track the status of the deployment
  -s, --skip-tests  skip running the test before publishing

EXAMPLE
  $ connect publish
```

_See code: [src/commands/publish.ts](https://github.com/ShipEngine/connect-cli/blob/v1.0.9/src/commands/publish.ts)_

## `connect start`

start a local web server to develop your app interactively

```
USAGE
  $ connect start

OPTIONS
  -h, --help       show help for the apps:start commands
  -p, --port=port  [default: 3000] the port that the app will run on
```

_See code: [src/commands/start.ts](https://github.com/ShipEngine/connect-cli/blob/v1.0.9/src/commands/start.ts)_

## `connect test`

test your app

```
USAGE
  $ connect test

OPTIONS
  -d, --debug            logs additional debug information
  -f, --fail-fast        stop running the test suite on the first failed test
  -g, --grep=grep        only run test that match the given string
  -h, --help             show help for the test command
  -r, --retries=retries  specify the retries for all the test
  -t, --timeout=timeout  specify the timeout for all the test

EXAMPLES
  $ connect test
  $ connect test --grep rateShipment
```

_See code: [src/commands/test.ts](https://github.com/ShipEngine/connect-cli/blob/v1.0.9/src/commands/test.ts)_

## `connect whoami`

display the current logged in user

```
USAGE
  $ connect whoami

OPTIONS
  -h, --help  show help for the auth:whoami command

ALIASES
  $ connect whoami
```

_See code: [src/commands/whoami.ts](https://github.com/ShipEngine/connect-cli/blob/v1.0.9/src/commands/whoami.ts)_
<!-- commandsstop -->
