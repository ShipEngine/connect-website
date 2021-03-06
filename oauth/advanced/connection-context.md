---
title: OAuth Connection Context
description: This describes the connection context
tags:
  - ShipEngine Connect
  - OAuth
---

# Connection Context

Nonstandard OAuth integrations occasionally both send and expect more than an
access token in the response and authenticated requests, respectively.

To accommodate for this, the platform allows a response transformer to specify
a collection of properties in `connection_context`. Properties defined in
`connection_context` are included in the 'code for token' (`POST /authflow/token`)
exchange response.

Values in the `connection_context` can use some _template expressions_, like
[`{callback:`](../templating/callback.md). This allows
an integration definition to capture values from the `redirect_uri` from the
3rd party to include in the connection context.

Including _any_ response transformer shifts the burden of response
parsing from the standard OAuth2 parser to the author of the DSL. The
following example parses a typical OAuth2 response with an extra top level
field.

An example:

``` JSON
/* A response from an integration */
{
  "access_token": "foo",
  "refresh_token": "bar",
  "token_type": "bearer",
  "expires_in": 3600,
  "store_id": "42"
}

/* A response transformer in the Integration Definition */
"response": {      
      "access_token": "$.access_token",
      "refresh_token": "$.refresh_token",
      "token_type": "$.token_type",
      "expires_in": "$.expires_in",
      "connection_context": {
          "store_id": "$.store_id"
      }
}

/* results in the following the platform TokenResponse */
{
    "access_token": "foo",
    "token_type": "bearer",
    "refresh_token": "bar",
    "expires_in": 3600,
    "raw_payload": "{
      \"access_token\":\"foo\",
      \"expires_in\":\"3600\",
      \"refresh_token\":\"bar\",
      \"store_id\":\"42\",
      \"token_type\":\"bearer\"
    }",
    "integration_api_code": "sample-server",
    "connection_context": {
        "store_id": "42" 
    }    
}

```
