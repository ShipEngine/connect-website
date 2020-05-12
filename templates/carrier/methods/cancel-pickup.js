"use strict";

/**
 * Cancels a previously-scheduled pickup
 */
async function cancelPickup(
  transaction,
  {
    cancellationID,
    pickupServiceID,
    identifiers,
    reason,
    notes,
    address,
    contact,
    timeWindows,
    shipments,
    customData,
  },
) {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // STEP 4: Create the output data that ShipEngine expects
}

module.exports = cancelPickup;
