"use strict";
/**
 * Logs in using the username and password entered on the login form
 */
async function connect(transaction, connectionFormData) {
  // STEP 1: Validation
  if (!connectionFormData.agree_to_eula) {
    throw new Error(`You must agree to the terms and conditions`);
  }

  // STEP 2: Create the data that the carrier's API expects

  // STEP 3: Call the carrier's API

  // STEP 4: Store session data in the transaction.session property,
  // which is persisted across all method calls
  transaction.session = {
    email: connectionFormData.email,
    password: connectionFormData.password,
    agree_to_eula: connectionFormData.agree_to_eula,
  };
}

module.exports = connect;
