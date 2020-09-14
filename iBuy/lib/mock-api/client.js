"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiClient = void 0;
const axios_1 = require("axios");
const authenticate_1 = require("./authenticate");
const retrieve_sales_orders_by_date_1 = require("./retrieve-sales-orders-by-date");
const verify_orders_1 = require("./verify-orders");
// Read config values from environment variables
const API_URL = process.env.API_URL || "https://httpbin.org/anything";
const API_TIMEOUT = Number.parseInt(process.env.API_TIMEOUT || "5000");
const API_KEY = process.env.API_KEY || "";
// Create an API client, configured via environment variables
exports.apiClient = axios_1.default.create({
    method: "post",
    url: API_URL,
    timeout: API_TIMEOUT,
    headers: {
        "API-Key": API_KEY
    },
    transformResponse(data) {
        data = JSON.parse(data);
        // HttpBin echoes back the request data
        let request = Object.assign({ method: data.method, url: data.url, headers: data.headers, origin: data.origin }, data.json);
        switch (request.operation) {
            case "authenticate":
                return authenticate_1.authenticate(request);
            case "retrieve_sales_orders_by_date":
                return retrieve_sales_orders_by_date_1.retrieveSalesOrdersByDate(request);
            case "verify_orders":
                return verify_orders_1.verifyOrders(request);
        }
    }
});
//# sourceMappingURL=client.js.map