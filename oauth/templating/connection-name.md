---
title: Connection Name Resolver
description: This describes the connection_name resolver
tags:
  - ShipEngine Connect
  - OAuth
---

# connection_name

Access values for the current connection, from the `connections` section of the
`AuthProcess`. The value is a JSONPath expression rooted at the specific
connection definition.

Given the following `connections` definition:

```json
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

The template declaration `{connection_name:$.url}` will resolve to either
`https://api-sandbox.example.com` or `https://api.example.com`, depending on
the connection the user is making ("sandbox" or "production").
