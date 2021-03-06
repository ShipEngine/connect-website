---
title: Callback Resolver
description: This describes the callback resolver
tags:
  - ShipEngine Connect
  - OAuth
---

# Callback

When a 3rd party redirects back to the platform at the `redirect_uri` provided, it
may pass back additional URL parameters. Those parameters can be accessed
during the auth flow via the `callback` resolver.

Given the following URL constructed by a 3rd party:

`https://authbridge-stage.auctane.com/authflow/fancy_integration/accept?code=the-code&foo=bar`

`foo=bar` can be accessed by the template expression `{callback:foo}` which
renders `bar`.
