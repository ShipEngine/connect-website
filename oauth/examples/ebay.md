---
title: eBay
description: Example definitions for oauth for ebay
tags:
  - ShipEngine Connect
  - OAuth
---

# eBay
As part of the installation process for ebay, not only was a `client_id`
and `client_secret` needed, but the implementors also required a custom property
`RuName`, as described in [eBay's documentation](https://developer.ebay.com/api-docs/static/oauth-redirect-uri.html).
After a member of the ShipEngine Connect team added `RuName` custom property to
the installation it was available as `{installation:RuName}` in the process
definition.

This example also demonstrates how you can pass base64-encoded credentials to
build an Authorization header (see the `request_token` section).

## Definition
``` JSON
{
  "authorization": {
    "url_template": "https://auth.ebay.com/oauth2/authorize",
    "query_parameters": [
      {
        "name": "client_id",
        "value": "{installation:client_id}"
      },
      {
        "name": "redirect_uri",
        "value": "{installation:RuName}"
      },
      {
        "name": "scope",
        "value": "https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/commerce.identity.readonly"
      },
      {
        "name": "response_type",
        "value": "code"
      },
      {
        "name": "consentGiven",
        "value": "false"
      }
    ],
    "nonce": null
  },
  "request_token": {
    "url_template": "https://api.ebay.com/identity/v1/oauth2/token",
    "method": "POST",
    "body": [
      {
        "name": "grant_type",
        "value": "authorization_code"
      },
      {
        "name": "code",
        "value": "{callback:code}"
      },
      {
        "name": "redirect_uri",
        "value": "{installation:RuName}"
      }
    ],
    "headers": [
      {
        "name": "Content-Type",
        "value": "application/x-www-form-urlencoded"
      },
      {
        "name": "Authorization",
        "value": "Basic {base64:{installation:client_id}:{installation:client_secret}}"
      }
    ],
    "query_parameters": []
  },
  "refresh_token": {
    "url_template": "https://api.ebay.com/identity/v1/oauth2/token",
    "method": "POST",
    "body": [
      {
        "name": "grant_type",
        "value": "refresh_token"
      },
      {
        "name": "refresh_token",
        "value": "{result_token_response:refresh_token}"
      }
    ],
    "headers": [
      {
        "name": "Content-Type",
        "value": "application/x-www-form-urlencoded"
      },
      {
        "name": "Authorization",
        "value": "Basic {base64:{installation:client_id}:{installation:client_secret}}"
      }
    ],
    "query_parameters": []
  },
  "advanced_configuration": []
}
```
