"use strict";

module.exports = {
  id: "<%- _uuidv4 %>",
  name: "<%- _appName %>",
  description: "<%- pjson.description %>",
  websiteURL: "https://www.order-source.com",
  logo: "./logo.svg",
  icon: "./logo.svg",
  connectionForm: "./forms/connect.js",
  getSalesOrdersByDate: "./methods/get-sales-order-by-date.js",
  shipmentCreated: "./methods/shipment-created.js",
  acknowledgeOrders: "./methods/acknowledge-orders.js"
}
