import { OrderSourceApp } from '@shipengine/connect-order-source-api';
import {
    SalesOrdersExport,
    ShipmentNotification,
    AcknowledgeOrders,
    GetProducts,
} from './methods';
import {
    Metadata
} from './definitions';

export default new OrderSourceApp({
    SalesOrdersExport,
    ShipmentNotification,
    AcknowledgeOrders,
    GetProducts,
    Metadata,
})
