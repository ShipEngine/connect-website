"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../mock-api/client");
/**
 * Logs in using the username and password entered on the login form
 */
async function acknowledgeOrders(transaction, notifications) {
    // STEP 1: Validation
    // Add any desired validation here
    // STEP 2: Create the data that the order's API expects
    const data = {
        operation: "verify_orders",
        session_id: transaction.session.id,
        sales_order_ids: notifications.map(notification => notification.id)
    };
    // STEP 3: Call the order source's API
    const response = await client_1.apiClient.request({ data });
    // Step 4: Create the output data that ShipEngine expects
    return formatAcknowledgedSalesOrders(response.data);
}
exports.default = acknowledgeOrders;
function formatAcknowledgedSalesOrders(verifiedSalesOrders) {
    return verifiedSalesOrders.map((acknowledgedOrder) => {
        if (acknowledgedOrder.succeeded) {
            return {
                id: acknowledgedOrder.sales_order_id,
                succeeded: true
            };
        }
        return {
            id: acknowledgedOrder.sales_order_id,
            succeeded: false,
            failureReason: acknowledgedOrder.reason_for_failure
        };
    });
}
//# sourceMappingURL=acknowledge-orders.js.map