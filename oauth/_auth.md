# OAuth Configuration
## Define Your Auth Process
You will need to start by defining your auth process as being an oauth type of auth process.
This is done by setting the `AuthProcess.Identifier.AuthenticationType = AuthenticationType.OAuth`.
```typescript
import {
  AuthenticationType,
  AuthSpecification,
  OrderSourceAppMetadata,
} from "@shipengine/connect-order-source-api";

export const AuthProcess: AuthSpecification = {
  Identifier: {
    AuthenticationType: AuthenticationType.OAuth,
    IsSandbox: false,
  },
  ...
};

export const Metadata: OrderSourceAppMetadata = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "bcce593b-dce3-4491-8722-a56e653c173f",
  Name: "Example",
  AuthProcess,
  OrderSources: [Example],
};
```

:::success Pro Tip
It is a helpful idea to give consumers of your application some details about the auth process they are going to initiate in the `AccountConnection.ConnectionFormSchema`.
:::
```typescript
export const ConnectionFormSchema: ReactForm = {
  JsonSchema: {
    title: "Example Merchant Center",
    description:
      'Follow these steps to get connected:<br><div class="instructions"><ol><li>To connect your Example Merchant Center to ShipStation, simply provide the Merchant ID (E.g. "123456789") you intend to use below.</li></ol></div>',
    type: "object",
    required: ["merchantId"],
    properties: {
      merchantId: {
        type: "string",
        title: "Merchant ID",
      },
      helpText: {
        type: "null",
        title: " ",
        description:
          '<div class="instructions"><ol><li value="2"> Click <b>Connect</b> to launch Example\'s consent screen, sign in with your associated Example account, then authorize ShipStation to retrieve your order information.</li></ol></div><br><i>In Example\'s <a href="https://merchants.Example.com/" target="_blank">Merchant Center</a>, find your merchant ID, which is the number at the top-right corner of the page, above the account email address.</i>',
      },
    },
  },
  UiSchema: {
    "ui:order": ["merchantId", "helpText"],
  },
};
```

The next step is to configure the rest of your AuthProcess to describe how the ShipEngine Connect platform will handle the oauth workflow.
We currently support two flavors of oauth, more details can be found at the following links:
- [OAuth 1](./1.0.md)
- [OAuth 2](./2.0.md)

## Publish
The next step will be to publish your application using the `connect publish` command.

## Request An Installation
> **INFO:** Your application must be published in order to have our platform establish an `OAuth Installation`, this installation process only needs to happen once and will tell our platform to start consuming your AuthProcess definition.

- Contact a member of the [ShipEngine Connect Team](mailto:connect@shipengine.com?subject=OAuth%20Installation) in order to establish a the platform installation
    - Provide a ClientId & ClientSecret used for initiating the oauth workflow
- Once the installation has been created you will recieve back a callback url

## Test
:::success PRO TIP
You may need to go back to the third parties website and set up the installation callback url as a whitelisted url.
:::

You are ready to begin testing your OAuth workflow, login with the credentials provided to you during the `connect publish` step, and go initiate your connection workflow.

## Examples
| Integration  | Auth Version | Details |
| ----------- | ----------- | ----------- |
| [eBay](./examples/ebay.md) | OAuth 2 | `custom installation properties`, `base64 encoding installation properties` |
| [Google](./examples/google.md) | OAuth 2 | `uses result_token_response` |
| [Trade Me](./examples/trade-me.md) | OAuth 1 | `uses auth1 redirector`, `uses response transformation` |
