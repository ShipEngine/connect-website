import { ConnectionFormSchema } from './connection-form-schema';
import { join } from 'path';
import { OrderSourceDefinition } from '@shipengine/connect-order-source-api';

export const brandTwo: OrderSourceDefinition = {
    Id: '824afe88-6329-4d12-9234-ea5cee646652',
    Name: 'Brand Two',
    SendEmail: true,
    CanRefresh: false,
    CanConfigureTimeZone: false,
    CanConfirmShipments: false,
    CanLeaveFeedback: true,
    HasCustomMappings: false,
    HasCustomStatuses: false,
    HasInventoryLevels: true,
    AccountConnection: {
        Name: 'Brand Two Connection',
        ConnectionFormSchema
    },
    Images: {
        Logo: join(__dirname, '../../assets/brand-two/logo.svg'),
        Icon: join(__dirname, '../../assets/brand-two/icon.svg'),
    }
};
