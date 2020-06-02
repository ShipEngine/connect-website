# shipengine-cli

### Command-line tool for working with your [ShipEngine](https://www.shipengine.com) account

[![Cross-Platform Compatibility](https://shipengine.github.io/img/badges/os-badges.svg)](https://github.com/ShipEngine/shipengine-cli/actions)
[![Build Status](https://github.com/ShipEngine/shipengine-cli/workflows/CI-CD/badge.svg)](https://github.com/ShipEngine/shipengine-cli/actions)

[![Coverage Status](https://coveralls.io/repos/github/ShipEngine/shipengine-cli/badge.svg?branch=master)](https://coveralls.io/github/ShipEngine/shipengine-cli)
[![Dependencies](https://david-dm.org/ShipEngine/shipengine-cli.svg)](https://david-dm.org/ShipEngine/shipengine-cli)

[![npm](https://img.shields.io/npm/v/@shipengine/cli.svg)](https://www.npmjs.com/package/@shipengine/cli)
[![License](https://img.shields.io/npm/l/@shipengine/cli.svg)](LICENSE)

# 🚧 UNDER CONSTRUCTION 🚧

### This app is still being developed and is <u><big>not ready for public use</big></u> yet.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/shipengine-cli.svg)](https://npmjs.org/package/shipengine-cli)
[![Downloads/week](https://img.shields.io/npm/dw/shipengine-cli.svg)](https://npmjs.org/package/shipengine-cli)
[![License](https://img.shields.io/npm/l/shipengine-cli.svg)](https://github.com/ShipEngine/shipengine-cli/blob/master/package.json)

<!-- toc -->
* [shipengine-cli](#shipengine-cli)
* [🚧 UNDER CONSTRUCTION 🚧](#-under-construction-)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @shipengine/cli
$ shipengine COMMAND
running command...
$ shipengine (-v|--version|version)
@shipengine/cli/0.0.1 darwin-x64 node-v12.16.2
$ shipengine --help [COMMAND]
USAGE
  $ shipengine COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`shipengine apps:new [PATH]`](#shipengine-appsnew-path)
* [`shipengine apps:test`](#shipengine-appstest)
* [`shipengine help [COMMAND]`](#shipengine-help-command)

## `shipengine apps:new [PATH]`

create a new package to develop a custom ShipEngine app

```
USAGE
  $ shipengine apps:new [PATH]

ARGUMENTS
  PATH  path to new package (defaults to current directory)

OPTIONS
  -f, --force  overwrite existing files
  -h, --help   show CLI help
  -y, --yes    skips the questions and uses the defaults (carrier|Javascript|yaml)

EXAMPLE
  $ shipengine apps:new
```

_See code: [src/commands/apps/new.ts](https://github.com/ShipEngine/shipengine-cli/blob/v0.0.1/src/commands/apps/new.ts)_

## `shipengine apps:test`

test your app

```
USAGE
  $ shipengine apps:test

OPTIONS
  -c, --concurrency=concurrency  [default: 1] specify the test concurrency
  -d, --debug                    provides additional logs to test output
  -f, --fail-fast                stop running the test suite on the first failed test
  -g, --grep=grep                only run test that match this string (e.g. method name or test SHA)
  -h, --help                     show CLI help

EXAMPLE
  $ shipengine apps:test
```

_See code: [src/commands/apps/test.ts](https://github.com/ShipEngine/shipengine-cli/blob/v0.0.1/src/commands/apps/test.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->
