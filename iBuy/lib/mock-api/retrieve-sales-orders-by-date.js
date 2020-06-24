"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveSalesOrdersByDate = void 0;
const status_and_mappings_1 = require("../status-and-mappings");
/**
 * This is a mock implementation of a carrier's API that generates a label for a shipment
 */
function retrieveSalesOrdersByDate(request) {
    return [
        {
            id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
            created_at: new Date().toISOString(),
            status: status_and_mappings_1.orderStatus[Math.floor(Math.random() * status_and_mappings_1.orderStatus.length)],
            payment: {
                status: status_and_mappings_1.paymentStatus[Math.floor(Math.random() * status_and_mappings_1.paymentStatus.length)],
                method: status_and_mappings_1.paymentMethod[Math.floor(Math.random() * status_and_mappings_1.paymentMethod.length)]
            },
            address: {
                business_name: "John Doe Business Name",
                lines: ["4450 E Palm Valley Blvd", "Bldg B", "Ste100"],
                city: "Round Rock",
                state: "Texas",
                postalCode: "78665",
                country: "US",
                time_zone: "America/Chicago"
            },
            seller_id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
            buyer: {
                id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
                name: "John Doe"
            },
            shipping_info: {
                confirmation_type: "signature",
                delivery_date: new Date().toISOString(),
            },
            shipping_items: [
                {
                    id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
                    name: "Item 1",
                    quantity: 2,
                    price_per_unit: 10,
                    product_id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase()
                },
                {
                    id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
                    name: "Item 2",
                    quantity: 4,
                    price_per_unit: 2,
                    product_id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase()
                }
            ],
            shipping_notes: "Please ring doorbell during dropoff"
        },
        {
            id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
            created_at: new Date().toISOString(),
            status: status_and_mappings_1.orderStatus[Math.floor(Math.random() * status_and_mappings_1.orderStatus.length)],
            payment: {
                status: status_and_mappings_1.paymentStatus[Math.floor(Math.random() * status_and_mappings_1.paymentStatus.length)],
                method: status_and_mappings_1.paymentMethod[Math.floor(Math.random() * status_and_mappings_1.paymentMethod.length)]
            },
            address: {
                business_name: "Jane Doe Business Name",
                lines: ["1 Letterman Dr", "Building C",],
                city: "San Francisco",
                state: "CA",
                postalCode: "94129",
                country: "US",
                time_zone: "America/Los_Angeles"
            },
            seller_id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
            buyer: {
                id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
                name: "Jane Doe"
            },
            shipping_info: {
                confirmation_type: "signature",
                delivery_date: new Date().toISOString(),
            },
            shipping_items: [
                {
                    id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
                    name: "Item 1",
                    quantity: 2,
                    price_per_unit: 10,
                    product_id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase()
                },
                {
                    id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
                    name: "Item 2",
                    quantity: 4,
                    price_per_unit: 2,
                    product_id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase()
                }
            ],
            shipping_notes: "Please ring doorbell during dropoff"
        }
    ];
}
exports.retrieveSalesOrdersByDate = retrieveSalesOrdersByDate;
//# sourceMappingURL=retrieve-sales-orders-by-date.js.map