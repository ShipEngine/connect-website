---
title: OAuth Refresh Token
description: This describes the refresh token step
tags:
  - ShipEngine Connect
  - OAuth
---

# Refresh Token

Some, but not all, 3rd parties return short-lived Access Tokens that must be
refreshed using a "refresh token". The `refresh_token` component describes the
server-server interaction the platform can make to refresh an access token using a
refresh token.

> **INFO:** The `{result_token_response:refresh_token}` will be resolved using the [result token response resolver](../templating/result-token-response.md).

```json
"refresh_token": {
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
        "value": "refresh_token"
      },
      {
        "name": "refresh_token",
        "value": "{result_token_response:refresh_token}"
      },
      {
        "name": "client_id",
        "value": "{installation:client_id}"
      },
      {
        "name": "client_secret",
        "value": "{installation:client_secret}"
      }
    ]
  }
```
