---
title: Auth State Resolver
description: This describes the auth state resolver
tags:
  - ShipEngine Connect
  - OAuth
---

# Auth State

When initializing an Auth Flow with the platform an Application may include
additional state in the JWT sent as the `auth_state` parameter. It will usually
include any data submitted by the user when configuring a connection, or any
other context the client wants to include with the request. This state is
accessible within an auth flow.

```json
// JWT claims in auth_state
{
  "iss": "sample-application",
  "aud": "the platform",
  "exp": 1617316251,
  "iat": 1617312651,
  "store_name": "fancy-store"
}
```

`{auth_state:store_name}` renders `fancy-store`

This can be useful if any of the URLs in the auth flow vary by user. For example:

```json
// from an Integration Definition
"authorization": {
    "url_template": "http://{auth_state:store_name}.myshopify.com/admin/oauth/authorize",
```
