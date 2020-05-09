"use strict";

const apiClient = require("./mock-api/client");

/**
 * Connects a user's Cargo Incorporated account to ShipEngine
 */
async function connect(transaction, connectionFormData) {
  // STEP 1: Validation
  if (!connectionFormData.agree_to_eula) {
    throw new Error(`You must agree to the terms and conditions`);
  }

  // STEP 2: Create the data that the carrier's API expects
  let data = {
    operation: "authenticate",
    account_id: connectionFormData.account_id,
    account_email: connectionFormData.account_email,
    account_password: connectionFormData.account_password,
    agree_to_eula: connectionFormData.agree_to_eula,
    eula: connectionFormData.eula,
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request({ data });

  // STEP 4: Store session data in the transaction.session property,
  // which is persisted across all method calls
  transaction.session = {
    id: response.data.id,
    ip: response.data.ip,
    created: response.data.created,
    language: response.data.language,
  };
}

module.exports = connect;
