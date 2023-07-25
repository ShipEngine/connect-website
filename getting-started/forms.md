---
title: Forms
---

<embed src="../forms/_intro.md" />

<embed src="../forms/_example.md" />

<embed src="../forms/_learning-more.md" />

### Handling input in the `Register` method

If you are building a `Carrier` app, you must implement a `Register` method to
process the user input when a connection is created. Other types of apps do
not currently support the `Register` method, however, all of the user input
from the registration form is included in the `auth` part of the input in
every function call to your app.

Given the following definition for the JsonSchema
```JSON
{
  "type": "object",
  "properties": {
    "email": {
      "type": "string"
    },
    "password": {
      "type": "string"
    },
    "CaseSensitive": {
      "type": "boolean"
    }
  }
}
```
When the "Connect" button is clicked by a user the [Register Method](/shipping/reference/operation/Register/) would receive a payload looking something like this:

```JSON Request Payload
{
    "registration_info": {
        "email": "test@example.com",
        "password": "password",
        "CaseSensitive": true
    },
    "transaction_id": "fa4525b2-8dd2-4514-acf5-5c92173d31fd",
    "metadata": {
    }
}
```
```TypeScript register.ts
...
interface RegistrationForm {
    email?: string;
    password?: string;
    CaseSensitive?: boolean;
}

export const Register = async (request: RegisterRequest): Promise<RegisterResponse> => {
    const { 
        email,
        password,
        CaseSensitive
    } = request.registration_info as RegistrationForm;
    ...
}
```
:::warning Notice
Notice how the interface for the `RegistrationForm` in the typescript code
defined every field as being potentially null given the `?`. This is because we
did not mark any of these fields as required in our JsonSchema.
:::
