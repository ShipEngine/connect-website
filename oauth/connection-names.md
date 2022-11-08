---
title: OAuth Connections
description: Vary configuration based on a named connection
tags:
  - ShipEngine Connect
  - OAuth
---

# Connections

## Overview

Some third party APIs are exposed as multiple instances or environments.
For example, in addition to the regular "production" environment, they may
expose a "sandbox" environment. The API contract is exactly the same, and
the authorization process is exactly the same, but a part of the request
(often, the hostname) is different. It can be useful to allow access to all
of the environments (called "Connections" in this documentation) through the
same ShipEngine Connect App, since most of the code should be exactly the same.

In order to support multiple environments, your `AuthProcess` definition must
include a `connections` section. It requires two attributes: `connection_names`
and `default_connection_name`.

The `default_connection_name` must define the connection to use when one is
not specified by the end user. In some situations, the end user will not have
a choice, so the connection they use is driven by the `default_connection_name`.

The value of `connection_names` is an object keyed by the names (strings) of
the available connections (ex: `"production"` and `"sandbox"`). The value of
each entry is a JSON object containing all of the configuration that needs to
vary by connection. Each configuration object should have the same shape for
each connection, but with different values. For example, if you need to vary
the authorization URL by connection, each connection object might have an
`authorization_url` entry with a different value. The JSON object can take
any shape and be as deep as you need, as long as you can reference the values
you need to extract using JSONPath.

The data in the `connection_names` section is available to the `AuthProcess`
definition via the [`connection_name:` template resolver](./templating/connection-name.md). It can access individual parts of the configuration object via a JSONPath
query. This allows you to vary the OAuth process based on the environment.

The module itself can also vary its logic based on the connection. For apps
that define `connection_names`, each incoming request to their functions
will include a `request.auth.connection_name` property indicating which
environment to use for the given request.

## Example
Consider this example (partial) `AuthProcess` definition:


```json
authorization: {
  url_template: '{connection_name:$.url}/oauth2/auth',
},

// ... elided irrelevant sections

connections: {
  default_connection_name: 'production',
  connection_names: {
    sandbox: {
      url: https://api-sandbox.example.com
    },
    production: {
      url: https://api.example.com
    },
  }
}
```

For this 3rd party, the URL that will be used during the authorization phase
needs to be different, depending on if you are accessing their productin
environment, or their sandbox environment. Therefore, the `url_template`
makes use of the `connection_name` resolver to substitute in a value from
the `connections` section. The `connection_name` resolver will automatically
scope to the `connection_names` section based on the connection chosen for
the current process. It will then apply the `$.url` JSONPath to pull out the
value it needs. So if a user starts the OAuth flow and indicates they want
the `sandbox` environment, the `{connection_name:$.url}` template value will
resolve to `https://api-sandbox.example.com`.


After the connection is established and a request is made to the app's functions,
the app can vary its logic based on the connection:

``` javascript
const baseUrl = (request.auth.connection_name==='sandbox') ?
  "https://api-sandbox.example.com" :
  "https://sandbox.example.com";
```
