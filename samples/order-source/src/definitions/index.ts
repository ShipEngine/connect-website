import {
  AuthenticationType,
  OrderSourceAppMetadata,
} from "@shipengine/connect-order-source-api";
import { brandOne } from "./brand-one";
import { brandTwo } from "./brand-two";

export const Metadata: OrderSourceAppMetadata = {
  Id: "3bdd999b-ecf5-4915-b505-c8e665ce1f56",
  Name: "Order Source API App",
  AuthProcess: {
    Identifier: {
      AuthenticationType: AuthenticationType.OAuth,
      IsSandbox: false,
    },
    access_token: {
      url_template: "https://api.ordersourceurl.com/v1/AccessToken",
    },
    request_token: {
      url_template: "https://api.ordersourceurl.com/v1/RequestToken",
    },
    authorization: {
      url_template: "https://api.ordersourceurl.com/API/v1/Authorise",
    },
    advanced_configuration: [
      {
        name: "redirector",
        value: "oauth1",
      },
    ],
  },
  OrderSources: [brandOne, brandTwo],
};
