import { OrderAppDefinition } from "@shipengine/connect-sdk";

const orderSource: OrderAppDefinition = {
  id: "3b76c08d-4299-4333-90bb-cd952bc68525",
  name: "IBuy MarketPlace",
  description: "Welcome to iBuy, the international marketplace for all of your needs.",
  websiteURL: "https://www.iBuy.net",
  logo: "./../logo.svg",
  icon: "./../logo.svg",
  connectionForm: import("./forms/connect"),

  getSalesOrdersByDate: import("./methods/get-sales-orders-by-date"),
  shipmentCreated: import("./methods/shipment-created"),
  acknowledgeOrders: import("./methods/acknowledge-orders")
}

export default orderSource;
