import {  AuthenticationType, OrderSourceAppMetadata } from "@shipengine/connect-order-source-api";
import { brandOne } from "./order-source";

export const Metadata: OrderSourceAppMetadata = {
    // DO NOT CHANGE THIS ID AFTER PUBLISHING
    Id: "<%- _uuidv4 %>",
    Name: "<%- _appName %>",
    AuthProcess: {
        Identifier: {
            AuthenticationType: AuthenticationType.Basic,
            IsSandbox: false
        }
    },
    OrderSources: [brandOne]
};
