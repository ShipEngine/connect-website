---
title: OAuth Definition
description: Example definitions for an oauth application
tags:
  - ShipEngine Connect
  - OAuth
---
# Example Definition

```TypeScript
import {
  AuthenticationType,
  AuthSpecification,
} from "@shipengine/connect-order-source-api";

export const AuthProcess: AuthSpecification = {
  Identifier: {
    AuthenticationType: AuthenticationType.OAuth,
    IsSandbox: false,
  },
  authorization: {
    url_template: "https://accounts.example.com/o/oauth2/v2/auth",
    query_parameters: [
      {
        name: "client_id",
        value: "{installation:CLIENT_ID}",
      },
      {
        name: "redirect_uri",
        value: "{system:authorize_callback_url}",
      },
      {
        name: "response_type",
        value: "code",
      },
      {
        name: "scope",
        value: "https://www.exampleapis.com/auth/content",
      },
      {
        name: "access_type",
        value: "offline",
      },
      {
        name: "prompt",
        value: "consent",
      },
    ],
    nonce: null,
  },
  request_token: {
    url_template: "https://oauth2.exampleapis.com/token",
    method: "POST",
    body: [
      {
        name: "redirect_uri",
        value: "{system:authorize_callback_url}",
      },
      {
        name: "code",
        value: "{callback:code}",
      },
      {
        name: "grant_type",
        value: "authorization_code",
      },
      {
        name: "client_id",
        value: "{installation:CLIENT_ID}",
      },
      {
        name: "client_secret",
        value: "{installation:CLIENT_SECRET}",
      },
    ],
    headers: [
      {
        name: "Content-Type",
        value: "application/x-www-form-urlencoded",
      },
    ],
    query_parameters: [],
  },
  refresh_token: {
    url_template: "https://oauth2.exampleapis.com/token",
    method: "POST",
    body: [
      {
        name: "client_secret",
        value: "{installation:CLIENT_SECRET}",
      },
      {
        name: "grant_type",
        value: "refresh_token",
      },
      {
        name: "client_id",
        value: "{installation:CLIENT_ID}",
      },
      {
        name: "refresh_token",
        value: "{result_token_response:refresh_token}",
      },
    ],
    headers: [
      {
        name: "Content-Type",
        value: "application/x-www-form-urlencoded",
      },
    ],
    query_parameters: [],
  },
  advanced_configuration: [],
};
```
