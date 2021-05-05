const { OrderSourceApp } = require('@shipengine/connect-order-source-api');
const {
    SalesOrdersExport,
    ShipmentNotification,
    AcknowledgeOrders,
    GetProducts,
} = require('./methods');
const {
    Metadata
} = require('./definitions');

module.exports = new OrderSourceApp({
    SalesOrdersExport,
    ShipmentNotification,
    AcknowledgeOrders,
    GetProducts,
    Metadata,
})
