"use strict";

module.exports = {
  id: "<%- _uuidv4 %>",
  name: "<%- _appName %>",
  description: "<%- pjson.description %>",
  websiteURL: "http://www.order-site.com",
  logo: "./logo.svg",
  connectionForm: "./forms/connect",
  settingsForm: "./forms/settings",

  connect: "./methods/connect",
  getSeller: "./methods/get-seller",
  getSalesOrder: "./methods/get-sales-order",
  getSalesOrdersByDate: "./methods/get-sales-order-by-date",
  shipmentCreated: "./methods/shipment-created",
  shipmentCancelled: "./methods/shipment-cancelled"
}
