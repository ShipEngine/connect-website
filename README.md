# ShipEngine Integration Platform CLI

### Command-line tool for building [ShipEngine Integration Platform](https://www.shipengine.com/docs/integration-platform/) apps

[![Cross-Platform Compatibility](https://shipengine.github.io/img/badges/os-badges.svg)](https://github.com/ShipEngine/shipengine-integration-platform-cli/actions)
[![Build Status](https://github.com/ShipEngine/shipengine-integration-platform-cli/workflows/CI-CD/badge.svg)](https://github.com/ShipEngine/shipengine-integration-platform-cli/actions)
[![Coverage Status](https://coveralls.io/repos/github/ShipEngine/shipengine-integration-platform-cli/badge.svg?branch=master)](https://coveralls.io/github/ShipEngine/shipengine-integration-platform-cli)

[![npm](https://img.shields.io/npm/v/@shipengine/integration-platform-cli.svg)](https://www.npmjs.com/package/@shipengine/integration-platform-cli)
[![Dependencies](https://david-dm.org/ShipEngine/shipengine-integration-platform-cli.svg)](https://david-dm.org/ShipEngine/shipengine-integration-platform-cli)
[![License](https://img.shields.io/npm/l/@shipengine/integration-platform-cli.svg)](LICENSE)

<!-- toc -->
* [ShipEngine Integration Platform CLI](#shipengine-integration-platform-cli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @shipengine/integration-platform-cli
$ shipengine COMMAND
running command...
$ shipengine (-v|--version|version)
@shipengine/integration-platform-cli/0.0.22 darwin-x64 node-v12.16.2
$ shipengine --help [COMMAND]
USAGE
  $ shipengine COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`shipengine help [COMMAND]`](#shipengine-help-command)
* [`shipengine info`](#shipengine-info)
* [`shipengine login`](#shipengine-login)
* [`shipengine logout`](#shipengine-logout)
* [`shipengine new [PATH]`](#shipengine-new-path)
* [`shipengine publish`](#shipengine-publish)
* [`shipengine start`](#shipengine-start)
* [`shipengine test`](#shipengine-test)
* [`shipengine whoami`](#shipengine-whoami)

## `shipengine help [COMMAND]`

display help for shipengine

```
USAGE
  $ shipengine help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `shipengine info`

list info for an app

```
USAGE
  $ shipengine info

OPTIONS
  -h, --help  show help for the info command
```

_See code: [src/commands/info.ts](https://github.com/ShipEngine/shipengine-integration-platform-cli/blob/v0.0.22/src/commands/info.ts)_

## `shipengine login`

login with your integrations API key

```
USAGE
  $ shipengine login

OPTIONS
  -h, --help  show help for the auth:login command

ALIASES
  $ shipengine login
```

_See code: [src/commands/login.ts](https://github.com/ShipEngine/shipengine-integration-platform-cli/blob/v0.0.22/src/commands/login.ts)_

## `shipengine logout`

clears the local integrations API key

```
USAGE
  $ shipengine logout

OPTIONS
  -h, --help  show help for the auth:logout command

ALIASES
  $ shipengine logout
```

_See code: [src/commands/logout.ts](https://github.com/ShipEngine/shipengine-integration-platform-cli/blob/v0.0.22/src/commands/logout.ts)_

## `shipengine new [PATH]`

create a new package to develop a custom ShipEngine app

```
USAGE
  $ shipengine new [PATH]

ARGUMENTS
  PATH  path to new package (defaults to current directory)

OPTIONS
  -f, --force  overwrite existing files
  -h, --help   show help for the new command
  -y, --yes    skips the questions and uses the defaults (carrier|Javascript|yaml)

ALIASES
  $ shipengine init

EXAMPLE
  $ shipengine new
```

_See code: [src/commands/new.ts](https://github.com/ShipEngine/shipengine-integration-platform-cli/blob/v0.0.22/src/commands/new.ts)_

## `shipengine publish`

publish your app

```
USAGE
  $ shipengine publish

OPTIONS
  -h, --help        show help for the publish command
  -s, --skip-tests  skip running the test before publishing
  -w, --watch       check the status of the deployment until complete

EXAMPLE
  $ shipengine publish
```

_See code: [src/commands/publish.ts](https://github.com/ShipEngine/shipengine-integration-platform-cli/blob/v0.0.22/src/commands/publish.ts)_

## `shipengine start`

start a local web server to develop your app interactively

```
USAGE
  $ shipengine start

OPTIONS
  -h, --help       show help for the apps:start commands
  -p, --port=port  [default: 3000] the port that the app will run on
```

_See code: [src/commands/start.ts](https://github.com/ShipEngine/shipengine-integration-platform-cli/blob/v0.0.22/src/commands/start.ts)_

## `shipengine test`

test your app

```
USAGE
  $ shipengine test

OPTIONS
  -d, --debug            logs additional debug information
  -f, --fail-fast        stop running the test suite on the first failed test
  -g, --grep=grep        only run test that match the given string
  -h, --help             show help for the test command
  -r, --retries=retries  specify the retries for all the test
  -t, --timeout=timeout  specify the timeout for all the test

EXAMPLES
  $ shipengine test
  $ shipengine test --grep rateShipment
```

_See code: [src/commands/test.ts](https://github.com/ShipEngine/shipengine-integration-platform-cli/blob/v0.0.22/src/commands/test.ts)_

## `shipengine whoami`

display the current logged in user

```
USAGE
  $ shipengine whoami

OPTIONS
  -h, --help  show help for the auth:whoami command

ALIASES
  $ shipengine whoami
```

_See code: [src/commands/whoami.ts](https://github.com/ShipEngine/shipengine-integration-platform-cli/blob/v0.0.22/src/commands/whoami.ts)_
<!-- commandsstop -->
