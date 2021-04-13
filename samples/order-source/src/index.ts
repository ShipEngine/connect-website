import { OrderSourceApp } from '@shipengine/connect-order-source-api';
import { join } from 'path';
import {
    SalesOrdersExport,
    ShipmentNotification,
    AcknowledgeOrders
} from './methods';
import {
    Metadata
} from './definitions';

export default new OrderSourceApp({
    SalesOrdersExport,
    ShipmentNotification,
    AcknowledgeOrders,
    Metadata,
    Logo: join(__dirname, '../assets/logo.svg'),
    Icon: join(__dirname, '../assets/icon.svg'),
})
