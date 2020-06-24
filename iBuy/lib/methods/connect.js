"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../mock-api/client");
/**
 * Logs in using the username and password entered on the login form
 */
async function connect(transaction, connectionFormData) {
    // STEP 1: Validation
    if (!connectionFormData.agree_to_eula) {
        throw new Error(`You must agree to the terms and conditions`);
    }
    // STEP 2: Create the data that the carrier's API expects
    let data = Object.assign({ operation: "authenticate" }, connectionFormData);
    // STEP 3: Call the carrier's API
    const response = await client_1.apiClient.request({ data });
    // STEP 4: Store session data in the transaction.session property,
    // which is persisted across all method calls
    transaction.session = {
        id: response.data.id,
        ip: response.data.ip,
        created: response.data.created,
        language: response.data.language,
    };
}
exports.default = connect;
//# sourceMappingURL=connect.js.map