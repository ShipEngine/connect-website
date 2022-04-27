---
title: System Resolver
description: This describes the system resolver
tags:
  - ShipEngine Connect
  - OAuth
---

# System

The `system` Value Resolver only has a single argument: `authorize_callback_url`.

`{system:authorize_callback_url}` will resolve to the public URL for the platform's 
`redirect_uri` endpoint sent to a 3rd party:

`https://<the platform-public-domain>/authflow/<integration-api-code>/accept`, ie:
`https://authrbridge-stage.auctane.com/authflow/fancy_integration/accept`
