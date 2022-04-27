---
title: Installation Resolver
description: This describes the installation resolver
tags:
  - ShipEngine Connect
  - OAuth
---

# Installation

The `installation` Value Resolver references the Installation of an Integration
within a the platform (GTM) Application.

```json
// dev_installation_data.json
{
    "app_Id": "sample-application",
    "integration_api_code": "sample-server",
    "client_id": "example-client-id",
    "client_secret": "example-client-secret"
}
```

`{installation:client_id}` renders `example-client-id`.

An Installation can optionally specify `Extra` key value pairs:

```json
{
    "app_Id": "sample-application",
    "integration_api_code": "sample-server",
    "client_id": "example-client-id",
    "client_secret": "example-client-secret",
    "extra": [
        { 
            "name": "special_code",
            "value": "rosebud",
        }
    ]
}
```

Extra can also be referenced by the Installation Value Resolver:
`{installation:special_code}` renders `rosebud`.
