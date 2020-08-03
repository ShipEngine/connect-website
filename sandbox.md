---
hidden: true
title: ShipEngine Integration App Sandbox Environments
description: ADD A DESCRIPTION HERE
---

Sandbox Environments
==================

Some carriers have the capability to support what is known as a [Sandbox Environment](https://en.wikipedia.org/wiki/Sandbox_(software_development)).

In the context of the [ShipEngine Integration Platform](index.md), a sandbox environment is a test environment that should mimic real service functionality as much as possible but **must not** incur any actual costs or affect production data.
Sandbox environments allow for easier development and testing of your application.

Usage
-----
Support for sandbox environments can be set in the application definitions. For example, in the [Delivery Service Definition](reference/delivery-service.md), you can specify this in the `hasSandbox` property.


Then when you implement the [createShipment method](reference/methods/create-shipment.md), the ShipEngine Integration Platform will indicate if the sandbox environment will be used by setting the `useSandbox` boolean in the [Transaction](reference/transaction.md) object that is included in every method call.


Examples
--------

```typescript
import { Transaction, NewShipment, ShipmentConfirmationPOJO } from "@shipengine/integration-platform-sdk";

/**
 * Requests a shipping label from the provider
 */
async function createShipment(transaction: Transaction, { format, size, shipment }: NewShipment): Promise<ShipmentConfirmationPOJO> {
  // ...Code to parse the incoming data to fit the app's data model...

  let response;
  if(transaction.useSandbox){
    // Sandbox related API calls go here
  }
  else {
    response = await apiClient.request({ data });
  }

  // Return the sandbox label information
  return await formatShipment(response.data);
}
```

```javascript
/**
 * Requests a shipping label from the provider
 */
async function createShipment(transaction, { format, size, shipment }) {
  // ...Code to parse the incoming data to fit the app's data model...

  let response;
  if(transaction.useSandbox){
    // Sandbox related API calls go here
  }
  else {
    response = await apiClient.request({ data });
  }

  // Return the sandbox label information
  return await formatShipment(response.data);
}
```
<div class="previous-next-nav">
  <a class="button button-small button-secondary" href="./error-handling.md">Previous: Error Handling</a>
  <a class="button button-small button-secondary" href="./testing/index.md">Next: Testing</a>
</div>
