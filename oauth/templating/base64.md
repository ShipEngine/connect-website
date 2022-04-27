---
title: Base64 Resolver
description: This describes the base64 resolver
tags:
  - ShipEngine Connect
  - OAuth
---

# Base64

The `base64` resolver encodes the value as a Base64 string:

`{base64:foo}` renders `Zm9v`

Note that the template engine itself is recursive so template expressions
can be evaluated: 

```json
// dev_installation_data.json
{
    "app_Id": "sample-application",
    "integration_api_code": "sample-server",
    "client_id": "example-client-id",
    "client_secret": "example-client-id"
}
```

1. template expression: `{base64:{installation:client_secret}}`
1. rendering pass 1: `{base64:example-client-id}`
1. rendering pass 2: `e2Jhc2U2NDpleGFtcGxlLWNsaWVudC1pZH0=`
