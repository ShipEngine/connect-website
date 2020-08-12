"use strict";
/**
 * Logs in using the username and password entered on the login form
 * 
 * View documentation here:
 * https://shipenginestag:439bd542@shipenginestag.wpengine.com/docs/integration-platform/reference/methods/connect
 * 
 * View sample implementation here:
 * https://github.com/ShipEngine/shipengine-integration-platform-sample-apps/blob/master/freightco/connect.js
 */
async function connect(transaction, connectionFormData) {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // STEP 4: Store session data in the transaction.session property,
  // which is persisted across all method calls
  // transaction.session = {};
}

module.exports = connect;
