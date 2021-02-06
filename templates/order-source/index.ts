import {
    OrderAppDefinition
} from "@shipengine/connect";

const orderSource: OrderAppDefinition = {
  id: "<%- _uuidv4 %>",
  name: "<%- _appName %>",
  description: "<%- pjson.description %>",
  websiteURL: "http://www.carier-site.com",
  logo: "./logo.svg",
  icon: "./logo.svg",
  connectionForm: import("./forms/connect"),
  settingsForm: import("./forms/settings"),

  getSalesOrdersByDate: import("./methods/get-sales-order-by-date"),
  shipmentCreated: import("./methods/shipment-created"),
  acknowledgeOrders: import("./methods/acknowledge-orders")

}

export default orderSource;
