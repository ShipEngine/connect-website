# Order Source App

``` typescript
import { logger, NotImplementedError, start } from '@shipengine/connect-runtime';
import { OrderSourceApp, AuthenticationType, AcknowledgeOrdersRequest, AcknowledgeOrdersResponse, SalesOrdersExportRequest, SalesOrdersExportResponse, ShipmentNotificationRequest, ShipmentNotificationResponse } from '@shipengine/connect-order-source-api';
import { join } from 'path';

const SalesOrdersExport = (request: SalesOrdersExportRequest): Promise<SalesOrdersExportResponse> => {
    logger.info('This is a useless log');
    throw new NotImplementedError();
}
const ShipmentNotification = (request: ShipmentNotificationRequest): Promise<ShipmentNotificationResponse> => {
    throw new NotImplementedError();
}
const AcknowledgeOrders = (request: AcknowledgeOrdersRequest): Promise<AcknowledgeOrdersResponse> => {
    throw new NotImplementedError();
}

start(new OrderSourceApp({
    SalesOrdersExport,
    ShipmentNotification,
    AcknowledgeOrders,
    Metadata: {
        Id: '3bdd999b-ecf5-4915-b505-c8e665ce1f56',
        Name: 'Order Source API App',
        AuthProcess: {
            Identifier: {
                AuthenticationType: AuthenticationType.Basic,
                IsSandbox: false
            }
        },
        OrderSources: [{
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
                ConnectionFormSchema: {
                    JsonSchema: {
                        "type": "object",
                        "required": [
                            "username",
                            "password"
                        ],
                        "properties": {
                            "username": {
                                "type": "string",
                                "title": "User Name:"
                            },
                            "password": {
                                "type": "string",
                                "title": "Password:"
                            }
                        }
                    },
                    UiSchema: {
                        "password": {
                            "ui:widget": "password",
                            "ui:help": "Hint: Make it strong!"
                        }
                    }
                }
            }
        }]
    },
    Logo: join(__dirname, '../assets/logo.svg'),
    Icon: join(__dirname, '../assets/icon.svg'),
}));
```

# Publishing

- Update Version In `package.json`
- Run `npm run-script build`
- Run `npm publish`

This will publish the app to [Nexus](https://infra-nexus.kube.sslocal.com/#browse/browse:s3-npm-hosted:%40ipaas%2Forder-source-api-runtime) (our private repository)
