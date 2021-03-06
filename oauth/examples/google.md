---
title: Google
description: Example definitions for oauth for google
tags:
  - ShipEngine Connect
  - OAuth
---

# Google
This is an OAuth 2 implementation for Google using their [V2 Documentation](https://developers.google.com/identity/protocols/oauth2).
## Definition
``` JSON
{
  "authorization": {
    "url_template": "https://accounts.google.com/o/oauth2/v2/auth",
    "query_parameters": [
      {
        "name": "client_id",
        "value": "{installation:client_id}"
      },
      {
        "name": "redirect_uri",
        "value": "{system:authorize_callback_url}"
      },
      {
        "name": "response_type",
        "value": "code"
      },
      {
        "name": "scope",
        "value": "https://www.googleapis.com/auth/content"
      },
      {
        "name": "access_type",
        "value": "offline"
      },
      {
        "name": "prompt",
        "value": "consent"
      }
    ],
    "nonce": null
  },
  "request_token": {
    "url_template": "https://oauth2.googleapis.com/token",
    "method": "POST",
    "body": [
      {
        "name": "redirect_uri",
        "value": "{system:authorize_callback_url}"
      },
      {
        "name": "code",
        "value": "{callback:code}"
      },
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
      }
    ],
    "headers": [
      {
        "name": "Content-Type",
        "value": "application/x-www-form-urlencoded"
      }
    ],
    "query_parameters": []
  },
  "refresh_token": {
    "url_template": "https://oauth2.googleapis.com/token",
    "method": "POST",
    "body": [
      {
        "name": "client_secret",
        "value": "{installation:client_secret}"
      },
      {
        "name": "grant_type",
        "value": "refresh_token"
      },
      {
        "name": "client_id",
        "value": "{installation:client_id}"
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
      }
    ],
    "query_parameters": []
  },
  "advanced_configuration": []
}
```
