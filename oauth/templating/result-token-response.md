---
title: Result Token Response Resolver
description: This describes the result token response resolver
tags:
  - ShipEngine Connect
  - OAuth
---

# Result Token Response

The `result_token_response` Value Resolver can access a property on the
`TokenResponse` object, which is populated with the values returned when the platform
exchanges the `code` with the 3rd party.

This is typically used to reference the refresh token during the `/refresh_token`
AuthFlow, so that the body that is sent to the 3rd party includes the refresh
token.

```json
//Sample Token Response
{
    "access_token": "ACCT-XyTfUE",
    "created_at": "2021-04-01T21:22:39.2486677Z",
    "raw_payload": "{\"access_token\":\"ACCT-XyTfUE\",\"expires_in\":\"3600\",\"refresh_token\":\"REFT-BeoUrh\",\"id_token\":\"IDT-gNILFf\",\"state\":\"some-state\",\"date_of_creation\":1617312159,\"token_type\":\"Bearer\"}",
    "token_type": "Bearer",
    "refresh_token": "REFT-BeoUrh",
    "expires_in": 3600
}
```

`{result_token_response:refresh_token}` renders `REFT-BeoUrh`
