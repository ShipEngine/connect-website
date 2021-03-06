---
title: OAuth Request Token
description: This describes the request token step
tags:
  - ShipEngine Connect
  - OAuth
---

# Request Token

After the end-user grants the Application access the integration redirects back
to the platform with a `code`. the platform makes a server-server request to the 3rd
party to exchange the code for an access token.
The `request_token` component of the DSL describes how the platform should
construct and execute that request.

See the [OAuth 2.0 RFC - Access Token Request](https://tools.ietf.org/html/rfc6749#section-4.1.3)
for more information on what standards are expected.

> **INFO:** The `{callback:code}` will be resolved using the [callback resolver](../templating/callback.md)

```json
"request_token": {
    "url_template": "http://localhost:3002/access/token/request",    
    "method": "POST",
    "headers": [
        {
            "name": "Content-Type",
            "value": "application/x-www-form-urlencoded"
        }
    ],
    "body": [
      {
        "name": "grant_type",
        "value": "authorization_code"
      },
      {
        "name": "client_id",
        "value": "{installation:client_id}"
      },
      {
        "name": "client_secret",
        "value": "{installation:client_secret}"
      },
      {
        "name": "code",
        "value": "{callback:code}"
      }
    ]
},
```
