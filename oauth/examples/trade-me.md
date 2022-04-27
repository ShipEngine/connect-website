---
title: Trade Me
description: Example definitions for trade me
tags:
  - ShipEngine Connect
  - OAuth
---

# Trade Me
Trade Me uses a 3 legged OAuth 1 strategy, so for them we needed to make use of the auth1 redirector in `advanced_configuration`
``` JSON
"advanced_configuration": [
    {
      "name": "redirector",
      "value": "oauth1"
    }
  ]
```
It also needs to take advantage of [response transformation](../advanced/response-transformation.md) to map the response payload from the `RequestToken` endpoint.
### Example Response Payload:
``` JSON
{
  "access_token": "TOKEN",
  "access_token_SECRET": "SECRET",
  "expires_in": "3600",
  "refresh_token": "REFRESH_TOKEN",
  "id_token": "ID_TOKEN",
  "state": "some-state",
  "date_of_creation": 1626115827,
  "token_type": "Bearer"
}
```
Using the `$.access_token` and `$.access_token_secret` JSON Paths.

## Definition
``` JSON
{
  "authorization": {
    "url_template": "https://nz.tradevine.com/API/v1/Authorise",
    "query_parameters": [],
    "nonce": null
  },
  "request_token": {
    "url_template": "https://api.tradevine.com/v1/RequestToken",
    "method": null,
    "body": [],
    "headers": [
      {
        "name": "Content-Type",
        "value": "application/x-www-form-urlencoded"
      }
    ],
    "query_parameters": [],
    "response": {
      "access_token": "$.access_token",
      "refresh_token": null,
      "token_type": "OAuth1",
      "expires_in": null,
      "expires_at": null,
      "connection_context": {
        "access_token_secret": "$.access_token_secret"
      }
    }
  },
  "refresh_token": null,
  "access_token": {
    "url_template": "https://api.tradevine.com/v1/AccessToken"
  },
  "advanced_configuration": [
    {
      "name": "redirector",
      "value": "oauth1"
    }
  ]
}
```
