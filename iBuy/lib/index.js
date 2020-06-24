"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderSource = {
    id: "3b76c08d-4299-4333-90bb-cd952bc68525",
    name: "IBuy MarketPlace",
    description: "Welcome to iBuy, the international marketplace for all of your needs.",
    websiteURL: "https://www.iBuy.net",
    logo: "./../logo.svg",
    icon: "./../logo.svg",
    connectionForm: Promise.resolve().then(() => require("./forms/connect")),
    settingsForm: Promise.resolve().then(() => require("./forms/settings")),
    connect: Promise.resolve().then(() => require("./methods/connect")),
    getSalesOrdersByDate: Promise.resolve().then(() => require("./methods/get-sales-orders-by-date")),
    shipmentCreated: Promise.resolve().then(() => require("./methods/shipment-created")),
    acknowledgeOrders: Promise.resolve().then(() => require("./methods/acknowledge-orders"))
};
exports.default = orderSource;
//# sourceMappingURL=index.js.map