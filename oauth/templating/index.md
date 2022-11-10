---
title: OAuth Templating
description: This describes templating
tags:
  - ShipEngine Connect
  - OAuth
---

# Templating

The Integration Definition DSL JSON is processed with a simple templating engine
that supports variable substitution and some basic operations.


```json
{
    "name": "client_id",
    "value": "{installation:client_id}"
}
...
{
    "name": "refresh_token",
    "value": "{result_token_response:refresh_token}"
},
...
{
    "name": "redirect_uri",
    "value": "{system:authorize_callback_url}"
},
```

## Value Resolvers

The example above shows these templating expressions:
`{installation:}`, `{result_token_response:}` and `{system:}`. A template expression
is defined by a value enclosed in curly brackets `{}`. The value always
contains at least one colon `:`. The part before the colon identifies the Value Resolver.
The part after the colon is a parameter passed to the Value Resolver.

A value resolver is a component in the templating engine that can look up or 
compute data. The simplest value resolvers in the platform simply use the RHS to point to a property.

| Expression  | Resolver |
| ----------- | ----------- |
| `{auth_state:` | [Auth State](./auth-state.md) |
| `{base64:` | [Base64](./base64.md) |
| `{callback:` | [Callback](./callback.md) |
| `{integration:` | [Integration](./integration.md) |
| `{installation:` | [Installation](./installation.md) |
| `{result_token_response:` | [Result Token Response](./result-token-response.md) |
| `{connection_name:` | [Connection](./connection-name.md) |
| `{system:` | [System](./system.md) |
