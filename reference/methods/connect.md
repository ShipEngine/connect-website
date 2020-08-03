---
hidden: true
title: connect Method
name: connect

description:
  This method is used to authenticate with your application.

documentation: |
  This method is used to authenticate with your application. It is responsible for verifying the supplied user credentials and establishing or
    renewing a session. This session will be stored in the [`transaction`](./../transaction.md) object and will be passed as an argument in every subsequent method call.
    All applications must implement the connect method.


param:
  name: connectionFormData
  type: connectionFormData
  signature: connectionFormData
  description: |
    The `connectionFormData` parameter is an object containing the authentication information gathered using the [connection form](../forms.md) you created for your application.
     It will contain whatever fields you defined in this form. Your method must then use this data to perform authentication with your backend service.

---
`{{name}}()`
===============================================
{{documentation}}

Syntax
-----------------------------------------------
```javascript
module.exports = async function {{name}}(transaction, {{param.name}}) {
  // Your code here
}
```

```typescript
export default async function connect(transaction: Transaction<Session>, connectionFormData: ConnectionFormData): Promise<void> {
  // Your code here
}
```




Parameters
-----------------------------------------------

#### `transaction`
A [transaction object](../transaction.md) containing information about the transaction and session state.

#### `{{param.name}}`
{{param.description}}

Return Value
-----------------------------------------------
The `connect` method does not return a value. Instead, the data that is returned in the response from calling your backend
service is used to create a `session` object that is stored in the `transaction` object that was passed as a parameter. This
`transaction` object will then be passed to every subsequent call to your application to enable your application.


Examples
-----------------------------------------------

```javascript
module.exports = async function connect(transaction, connectionFormData) {
  // STEP 1: Validation
  if (!connectionFormData.agree_to_eula) {
    throw new Error(`You must agree to the terms and conditions`);
  }

  // STEP 2: Create the data that the carrier's API expects
  let data = {
    operation: "authenticate",
    account_id: connectionFormData.account_id,
    account_email: connectionFormData.account_email,
    account_password: connectionFormData.account_password,
    agree_to_eula: connectionFormData.agree_to_eula,
    eula: connectionFormData.eula,
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request({ data });

  // STEP 4: Store session data in the transaction.session property,
  // which is persisted across all method calls
  transaction.session = {
    id: response.data.id,
    ip: response.data.ip,
    created: response.data.created,
    language: response.data.language,
  };
}
```

```typescript
import { Transaction } from "@shipengine/integration-platform-sdk";
import { Session } from "./session";

interface ConnectionFormData {
  account_id: string;
  account_email: string;
  account_password: string;
  agree_to_eula: boolean;
  eula: string;
}

/**
 * Logs in using the username and password entered on the login form
 */
export default async function connect(
  transaction: Transaction<Session>, connectionFormData: ConnectionFormData): Promise<void> {

  // STEP 1: Validation
  if (!connectionFormData.agree_to_eula) {
    throw new Error(`You must agree to the terms and conditions`);
  }

  // STEP 2: Create the data that the carrier's API expects
  let data: AuthenticateRequest = {
    operation: "authenticate",
    ...connectionFormData,
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request<AuthenticateResponse>({ data });

  // STEP 4: Store session data in the transaction.session property,
  // which is persisted across all method calls
  transaction.session = {
    id: response.data.id,
    ip: response.data.ip,
    created: response.data.created,
    language: response.data.language,
  };
}
```


