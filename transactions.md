---
hidden: true
title: ShipEngine Integration Platform Transactions and Retries
description: Learn about the Transaction object and how to use that for call retries after unexpected errors.
---

Transactions and Retries
==================

Every [ShipEngine Integration Platform](./index.md) application method accepts a [Transaction](reference/transaction.md) object as parameter. It is responsible for providing contextual information about the specific method call in regards to:

* The user's authentication state.
* Saved session data.
* The specific ShipEngine Integration Platform call via the `id` property.

Retries
-------
API failures and failed network connections are unfortunately an unavoidable part of hosting an API.

To account for this, the `Transaction` object provides the `id` property, which uniquely identifies the current transaction. It also provides the `isRetry` flag.

A combination of these two properties should be used to detect retries from the ShipEngine Integration Platform as well as used to detect and prevent duplicate operations.


<div class="previous-next-nav">
  <a class="button button-small button-secondary" href="./implementation.md">Previous: Implementing Your Methods</a>
  <a class="button button-small button-secondary" href="./error-handling.md">Next: Error Handling</a>
</div>
