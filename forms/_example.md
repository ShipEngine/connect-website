## Example

:::success Pro Tip
By adding the `"ui:order"` property to your `UiSchema` you can gaurantee the order that the form fields will be generated in. Due to serialization / deserialization we cannot gaurantee order of form fields without this property.
:::

<image src="../images/form.png" />

```TypeScript registration-form.ts

const JsonSchema =  {
    type: "object",
    title: "Login Form Example",
    required: ["email", "password"],
    properties: {
    email: {
        type: "string",
        title: "Email Address",
        format: "email",
    },
    password: {
        type: "string",
        title: "Password",
        minLength: 8,
    },
    },
    description: "Connect to your account.",
};

const UiSchema = {
    "ui:order": ["email", "password"],
    email: {
    "ui:autofocus": true,
    "ui:emptyValue": "you@example.com",
    },
    password: {
    "ui:help": "Note: password is case sensitive",
    "ui:widget": "password",
    },
};

export const RegistrationFormSchema = {
    JsonSchema,
    UiSchema,
};
```
```TypeScript carrier.ts
import {
  Carrier
  ...
} from "@shipengine/connect-carrier-api";
import { RegistrationFormSchema } from "./registration-form";
import { SettingsFormSchema } from "./settings-form";


export const DemoCarrier: Carrier = {
 ...
  AccountModals: {
    RegistrationFormSchema,
    SettingsFormSchema
  },
};

```
