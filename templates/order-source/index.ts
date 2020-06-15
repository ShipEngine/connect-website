import { OrderAppDefinition } from "@shipengine/integration-platform-sdk";

const orderSource: OrderAppDefinition = {
  id: "<%- _uuidv4 %>",
  name: "<%- _appName %>",
  description: "<%- pjson.description %>",
  websiteURL: "http://www.carier-site.com",
  logo: "./logo.svg",
  connectionForm: import("./forms/connect"),
  settingsForm: import("./forms/settings"),

  connect: import("./methods/connect"),
  getSeller: import("./methods/get-seller"),
  getSalesOrder: import("./methods/get-sales-order"),
  getSalesOrdersByDate: import("./methods/get-sales-order-by-date"),
  shipmentCreated: import("./methods/shipment-created"),
  shipmentCancelled: import("./methods/shipment-cancelled")
}

export default orderSource;