---
title: OAuth Authorization
description: This describes the authorization step
tags:
  - ShipEngine Connect
  - OAuth
---

# Authorization
Authorization begins with the platform acting on behalf of a ShipEngine Connect Application,
asking an end user to give permission for the Application to access the user's
data in the Integration. This is done by redirecting the user's browser to the
integration, ensuring they are logged in, and accepting the scope of data-access
that a given Integration Definition may specify.

```json
// authorization DSL
"authorization": {
    "url_template": "http://localhost:3002/oauth/authorize",
    "query_parameters": [
        {
            "name": "grant_type",
            "value": "authorization_code"
        },
        {
            "name": "response_type",
            "value": "code"
        },
        {
            "name": "redirect_uri",
            "value": "{system:authorize_callback_url}"
        },
        {
            "name": "client_id",
            "value": "{installation:client_id}"
        }
    ],
    "nonce": {
        "name": "state"
    }
}
```

In the example above the Definition contains templated information describing
how the platform should construct and redirect the user's browser. 

See the [OAuth 2.0 RFC - Authorization Request](https://tools.ietf.org/html/rfc6749#section-4.1.1)
for more information on what standards expect.

- `url_template` The authorize endpoint of the integration
- `query_parameters` Any query parameters that the integration's OAuth authorize
endpoint expects to receive.
- `nonce` A random string included in the authorization request and returned in the redirect. [This is used to prevent cross-site request forgery.](https://datatracker.ietf.org/doc/html/rfc6749#section-10.12)
- `{system:authorize_callback_url}` will be updated using the [system resolver](../templating/system.md) with the url in ShipEngine Connect that will handle the callback.
