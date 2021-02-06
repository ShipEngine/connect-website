"use strict";

/**
 * Called when shipment is created
 *
 *
 * View documentation here:
 * https://connect.shipengine.com/docs/reference/methods/shipment-created
 *
 * View sample implementation here:
 * https://github.com/ShipEngine/connect-samples/blob/master/southwest-products/src/methods/shipment-created.js
 *
 */
async function shipmentCreated(transaction, shipment) {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the order's API expects
  // STEP 3: Call the order's API
  // Step 4: Create the output data that ShipEngine expects
}

module.exports = shipmentCreated;
