import { 
  OrderAppDefinition, 
  InlineOrReference, 
  GetSalesOrdersByDate, 
  ShipmentCreated, 
  ShipmentCancelled, 
  Connect 
} from "@shipengine/integration-platform-sdk";

const orderSource: OrderAppDefinition = {
  id: "<%- _uuidv4 %>",
  name: "<%- _appName %>",
  description: "<%- pjson.description %>",
  websiteURL: "http://www.carier-site.com",
  logo: "./logo.svg",
  connectionForm: import("./forms/connect"),
  settingsForm: import("./forms/settings"),

  connect: import("./methods/connect") as InlineOrReference<Connect>,
  getSalesOrdersByDate: import("./methods/get-sales-order-by-date") as InlineOrReference<GetSalesOrdersByDate>,
  shipmentCreated: import("./methods/shipment-created") as InlineOrReference<ShipmentCreated>,
  shipmentCancelled: import("./methods/shipment-cancelled") as InlineOrReference<ShipmentCancelled>
}

export default orderSource;