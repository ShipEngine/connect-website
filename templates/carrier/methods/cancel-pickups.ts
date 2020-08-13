import {
  PickupCancellation,
  PickupCancellationOutcome,
  Transaction,
} from "@shipengine/connect-sdk";
import { Session } from "./session";

/**
 * Cancels one or more previously-scheduled pickups
 *
 * See an example implementation below
 * https://github.com/ShipEngine/connect-samples/blob/master/parcel-post/carrier/src/methods/cancel-pickups.ts
 
 * View sample implementation here: 
 * https://github.com/ShipEngine/connect-samples/blob/master/parcel-post/src/methods/cancel-pickups.ts

 */
export default async function cancelPickups(
  transaction: Transaction<Session>,
  pickups: PickupCancellation[],
): Promise<PickupCancellationOutcome[]> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // STEP 4: Create the output data that ShipEngine expects
}
