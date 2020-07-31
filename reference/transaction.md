---
layout: nunjucks/layouts/object-page.njk
title: Transaction object
name: Transaction

description:
  The transaction object provides important information about a method invocation. It also allows you to pass session state between methods, which is especially important for authentication credentials.

documentation: |
  Every method in a [ShipEngine Integration Platform](./../index.md) application receives a transaction object as the first parameter. This object contains useful information about the method invocation, such as a unique `transactionID`,
  whether the call is a test (aka [sandbox](./../sandbox.md)) call, and session state such as authentication credentials.

fields:
  - name: id
    type: UUID
    required: true
    description: Uniquely identifies the current transaction. If the transaction is retried, then this `id` will remain the same. You can use this to detect and prevent duplicate operations.

  - name: isRetry
    type: boolean
    required: false
    description: Indicates whether this transaction is a retry, in which case the `id` will be the same as the original attempt. If `isRetry` is `true`, then the operation should try to continue the original transaction
      where it left off. Efforts should be made to prevent duplicate data or double charges.

  - name: useSandbox
    type: boolean
    required: false
    description: Indicates whether the operation should use the carrier's [sandbox](./../sandbox.md) or development API rather than the normal production API. If `useSandbox` is `true`, then the operation MUST NOT incur any actual costs or affect
      production data.

  - name: session
    type: object
    required: true
    description: The application's session data. Any method may update the session data, such as renewing a session token or updating a timestamp. Must be JSON serializable.

---


Example
-------------------------------------------------
Here's an example transaction object:

```javascript
{
  id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
  isRetry: false,
  useSandbox: false,
  session: {
    id: "sess_184849191484716854941017",
    accountNumber: "10004583",
    expires: "2025-07-16T12:45:15.000Z",
    lang: "en-US",
  }
}
```

```yaml
id: 6ad41b24-62a8-4e17-9751-a28d9688e277
isRetry: false
useSandbox: false,
session:
  id: sess_184849191484716854941017
  accountNumber: 10004583
  expires: 2025-07-16T12:45:15.000Z
  lang: en-US
```
