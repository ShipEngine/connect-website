import {
  PickupConfirmation,
  PickupRequest,
  Transaction,
} from "@shipengine/integration-platform-sdk";
import { Session } from "./session";

/**
 * Schedules a pick-up at a specific time and location
 *
 * View sample implementation here:
 * https://github.com/ShipEngine/shipengine-integration-platform-sample-apps/blob/master/parcel-post/carrier/src/methods/schedule-pickup.ts
 */
export default async function schedulePickup(
  transaction: Transaction<Session>,
  pickup: PickupRequest,
): Promise<PickupConfirmation> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // STEP 4: Create the output data that ShipEngine expects
}
