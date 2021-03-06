---
title: OAuth Response Transformation
description: This describes response transformation
tags:
  - ShipEngine Connect
  - OAuth
---

# Response Transformation

For integrations that do not conform to the OAuth 2.0 specifications for
a token and refresh token exchange, an Integration DSL may specify how responses
from the two exchanges can be mapped into the the platform canonical model.

Transformation is done by adding an additional property `response`
configuration to the `request_token` and `refresh_token` configuration
properties.

Transformers access properties of a response JSON using
[JSONPath](https://jsonpath.com/). Properties that _do not_ start with `$` will
be interpreted as a value, the following example demonstrates the use of both
JSONPath transformation and value mapping.

Given the response payload from an integration token request:

``` JSON
{
 "message": "",
 "code": 0,
 "data": {
  "access_token": "the-access-token",
  "scopes": [
   "foo",
   "bar"
  ],
  "merchant_id": "",
  "expiry_time": "2021-07-17T20:30:00.000+00:00",
  "refresh_token": "the-refresh-token"
 }
}
```

``` JSON
{
  "request_token": {
    /* ... omitted ... */
    "response": {      
      "access_token": "$.data.access_token",
      "refresh_token": "$.data.refresh_token",
      "token_type": "Bearer",
      /* expires_in: "$.data.expires_in" */
      "expires_at": {
        "path": "$.data.expiry_time",
        "date_time_format": "yyyy-MM-ddTHH:mm:ss.fffzzz"
      }
 }
}
```

The `response` object defines a JSONPath expression that the platform
uses to access a value from the response, then populates the associated property
ie. `$.data.access_token` maps into the `IntegrationTokenResponse.AccessToken`
property.

This example also demonstrates two additional features:

1. The value `Bearer` for `token_type` maps directly into the
`IntegrationTokenResponse.TokenType` property with a value of `Bearer`.
1. `expires_at` Is an object, rather than a JSONPath.
    * The `path` property is JSONPath informing the platform where to obtain the
    value.
    * The `date_time_format` property is a date-time format string that can be
    either a [standard](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings) format string in .NET or a
    [custom](https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings) format string for .NET. This example
    uses a custom format string.

`expires_in` vs `expires_at` OAuth2 specifies `expires_in` as a standard
field informing the client how long, in seconds, until the `access_token`
expires. In the example above the integration provides `expires_at`. An integration
DSL may specify either `expires_in` or `expires_at` but **not both**. In the case 
of the latter, `expires_at` the platform will parse the date-time and compute an
`expires_in` value.
