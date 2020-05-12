"use strict";

/**
 * Schedules a pick-up at a specific time and location
 */
export default async function schedulePickup(
  transaction,
  { pickupServiceID, timeWindow, address, contact, notes, shipments },
) {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // STEP 4: Create the output data that ShipEngine expects
}

module.exports = schedulePickup;
