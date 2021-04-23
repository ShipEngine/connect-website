import {  AuthenticationType, OrderSourceAppMetadata } from "@shipengine/connect-order-source-api";
import { brandOne } from "./brand-one";
import { brandTwo } from "./brand-two";

export const Metadata: OrderSourceAppMetadata = {
    Id: '3bdd999b-ecf5-4915-b505-c8e665ce1f56',
    Name: 'Order Source API App',
    AuthProcess: {
        Identifier: {
            AuthenticationType: AuthenticationType.Basic,
            IsSandbox: false
        }
    },
    OrderSources: [brandOne, brandTwo]
};
