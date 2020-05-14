import {
  PickupCancellation,
  PickupCancellationOutcomePOJO,
  Transaction,
} from "@shipengine/integration-platform-sdk";
import { Session } from "./session";

/**
 * Cancels one or more previously-scheduled pickups
 *
 * See an example implementation below
 * https://github.com/ShipEngine/shipengine-integration-platform-sample-apps/blob/master/parcel-post/carrier/src/methods/cancel-pickups.ts
 */
export default async function cancelPickups(
  transaction: Transaction<Session>,
  pickups: PickupCancellation[],
): Promise<PickupCancellationOutcomePOJO[]> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // STEP 4: Create the output data that ShipEngine expects
}
