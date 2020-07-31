---
title: Shipengine Integration Platform Error Handling
description: Learn how ShipEngine App's are expected to handle errors.
---

Error Handling
=============

[ShipEngine Integration Platform](./index.md) applications are designed to handle [Errors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) the same as any other [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) application. Any uncaught exception will terminate the currently executing method and generate an error log.

<!-- Example -->
<!-- -------- -->
The methods you implement will often need to validate the input from the ShipEngine Integration Platform before transforming the data and calling your backend API. If this validation fails, you would provide an error as in the example below.

```javascript highlights="3"
for (let parcel of shipment.packages) {
  if (parcel.packaging.id === OWN_PACKAGING && parcel.weight.grams > 100000) {
    throw new Error(`${parcel.packaging.name} cannot weigh more than 100 kilograms`);
  }
}
```

Error Codes
-----------
The [Shipengine SDK](sdk.md) allows for adding additional information to your application's errors, which will provide more efficient diagnostics once your application is hosted
and administered by the ShipEngine Integration Platform.




### Error Code Properties

> **Info**
> There are private error codes available in the SDK. However, those are subject to internal changes and should not be used in your application.

Here are a list of the error codes that can be added to a normal Javascript Error object.

| Code                        | Description |
| -----                       | ----------- |
| `ERR_INVALID`               | Indicates an issue with validating inputs. |
| `ERR_BAD_REQUEST`           | Indicates that a resource request failed because of an issue with the app's request. |
| `ERR_UNAUTHORIZED`          | Indicates that an action failed because of invalid credentials. |
| `ERR_RATE_LIMIT`            | Indicates that the maximum number of calls were exceeded. Add the `retryAfter` property to the error object to indicate when the request should be resent. |
| `ERR_EXTERNAL_SERVER_ERROR` | Indicates that an external resource encountered an unexpected condition that prevented the resource from being retrieved. |

### Example

```javascript
let error = new Error(`${parcel.packaging.name} cannot weigh more than 100 kilograms`);
error.code = "ERR_RATE_LIMIT";
error.retryAfter = 2000;

throw error;
```

```typescript
let error = new Error(`${parcel.packaging.name} cannot weigh more than 100 kilograms`) as ShipEngineError;
error.code = "ERR_RATE_LIMIT";
error.retryAfter = 2000;

throw error;
```

<div class="previous-next-nav">
  <a class="button button-small button-secondary" href="./transactions.md">Previous: Transactions & Retries</a>
  <a class="button button-small button-secondary" href="./sandbox.md">Next: Sandbox</a>
</div>
