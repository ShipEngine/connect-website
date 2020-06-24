"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../mock-api/client");
/**
 * Logs in using the username and password entered on the login form
 */
async function shipmentCreated(transaction, shipment) {
    // STEP 1: Validation
    // Add any desired validation here
    // STEP 2: Create the data that the order source's API expects
    const data = {
        operation: "create_shipment",
        session_id: transaction.session.id,
        shipment_id: shipment.trackingNumber
    };
    // STEP 3: Call the order source's API
    await client_1.apiClient.request({ data });
}
exports.default = shipmentCreated;
//# sourceMappingURL=shipment-created.js.map