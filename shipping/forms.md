---
title: Forms
---

<embed src="../forms/_intro.md" />

<embed src="../forms/_example.md" />

<embed src="../forms/_learning-more.md" />

### Registration Form

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
When the "Connect" button is clicked by a user the [Register Method](../reference/operation/Register/) would recieve a payload looking something like this:

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
Notice how the interface for the `RegistrationForm` in the typescript code defined every field as being potentially null given the `?`. This is because we did not mark any of these fields as required in our JsonSchema.
:::
