# OAuth Configuration
## Define Your Authorization Process
You will need to start by declaring that your App uses OAuth to obtain
credentials.
This is done by setting the `AuthProcess.Identifier.AuthenticationType = AuthenticationType.OAuth`
within your `AuthProcess`:

```typescript
import {
  AuthenticationType,
  AuthSpecification,
  OrderSourceAppMetadata,
} from "@shipengine/connect-order-source-api";

export const AuthProcess: AuthSpecification = {
  Identifier: {

// DECLARE THE APP USES OAUTH
    AuthenticationType: AuthenticationType.OAuth,

    IsSandbox: false,
  },
  ...
};

export const Metadata: OrderSourceAppMetadata = {
  Id: "bcce593b-dce3-4491-8722-a56e653c173f",
  Name: "Example",
  AuthProcess,
  OrderSources: [Example],
};
```

:::success Pro Tip
It is helpful to give consumers of your application some details about the authorization process they are going to initiate in the `AccountConnection.ConnectionFormSchema`.
:::
```typescript
export const ConnectionFormSchema: ReactForm = {
  JsonSchema: {
    title: "Example Merchant Center",
    description:
      `Follow these steps to get connected:<br>
       <div class="instructions">
         <ol><li>
           To connect your Example Merchant Center to ShipStation, simply
           provide the Merchant ID (E.g. "123456789") you intend to use below.
         </li></ol>
       </div>`,
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
        description: `<div class="instructions"><ol><li value="2">
          Click <b>Connect</b> to launch Example\'s consent screen, sign in
          with your associated Example account, then authorize ShipStation to
          retrieve your order information.
       </li></ol>
       </div><br>
       <i>In Example\'s <a href="https://merchants.Example.com/" target="_blank">Merchant Center</a>,
       find your merchant ID, which is the number at the top-right corner of
       the page, above the account email address.</i>`,
      },
    },
  },
  UiSchema: {
    "ui:order": ["merchantId", "helpText"],
  },
};
```

The next step is to configure the your `AuthProcess` to describe each step in
the authorization process. OAuth is a relatively loose standard, and there are
a lot of variations. Follow the instructions for the standard that your
application most closely adheres to:

- [OAuth 1.x](./1.0.md)
- [OAuth 2.x](./2.0.md)

## Publish
The next step will be to publish your application using the `connect publish` command.

## Request An Installation
:::attention
Your application must be published before you can establish an "Installation".
:::

Once published, contact a member of the [ShipEngine Connect Team](mailto:connect@shipengine.com?subject=OAuth%20Installation)
to create the Installation. You will need to provide them with any application-level
credentials. For OAuth applications, this is usually a Client ID and Client Secret.
When the Installation is created, a _callback url_ will be generated. This is
the URL that will be specified as the `redirect_uri` during the OAuth flow.

## Test
:::success PRO TIP
You may need to go back to the third party's website to add the installation callback url to an allow-list.
:::

You are ready to begin testing your OAuth workflow. Login with the credentials
provided to you during the `connect publish` step, and go to the settings page
to add a new connection to your integration.

## Examples
| Integration  | Auth Version | Details |
| ----------- | ----------- | ----------- |
| [eBay](./examples/ebay.md) | OAuth 2 | `custom installation properties`, `base64 encoding installation properties` |
| [Google](./examples/google.md) | OAuth 2 | `uses result_token_response` |
| [Trade Me](./examples/trade-me.md) | OAuth 1 | `uses auth1 redirector`, `uses response transformation` |
