"use strict";

module.exports = {
  id: "<%- _uuidv4 %>",
  name: "<%- _appName %>",
  description: "<%- pjson.description %>",
  websiteURL: "http://www.order-site.com",
  logo: "./logo.svg",
  connectionForm: "./forms/connect.js",
  settingsForm: "./forms/settings.js",

  connect: "./methods/connect.js",
  getSeller: "./methods/get-seller.js",
  getSalesOrder: "./methods/get-sales-order.js",
  getSalesOrdersByDate: "./methods/get-sales-order-by-date.js",
  shipmentCreated: "./methods/shipment-created.js",
  shipmentCancelled: "./methods/shipment-cancelled.js"
}
