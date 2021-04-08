import { start } from '@shipengine/connect-runtime';
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

start(new OrderSourceApp({
    SalesOrdersExport,
    ShipmentNotification,
    AcknowledgeOrders,
    Metadata,
    Logo: join(__dirname, '../assets/logo.svg'),
    Icon: join(__dirname, '../assets/icon.svg'),
}));
