import {  AuthenticationType, OrderSourceAppMetadata } from "@shipengine/connect-order-source-api";
import { ConnectionFormSchema } from './connection-form-schema';

const orderSourceApp = {
    Id: '3440a3bf-cd22-494f-ad02-500b6cdcedb8',
    Name: 'Order Source API App',
    SendEmail: true,
    ScoreFactorForAutoRefresh: 0.1,
    CanRefresh: false,
    CanConfigureTimeZone: false,
    CanConfirmMultipleShipments: false,
    CanConfirmShipments: false,
    CanLeaveFeedback: true,
    HasCustomMappings: false,
    HasCustomStatuses: false,
    HasInventoryLevels: true,
    AccountConnection: {
        Name: 'OrderSource API App Connection Form',
        ConnectionFormSchema
    }
};

export const Metadata: OrderSourceAppMetadata = {
    Id: '3bdd999b-ecf5-4915-b505-c8e665ce1f56',
    Name: 'Order Source API App',
    AuthProcess: {
        Identifier: {
            AuthenticationType: AuthenticationType.Basic,
            IsSandbox: false
        }
    },
    OrderSources: [orderSourceApp]
};
