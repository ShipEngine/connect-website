import {
  PickupCancellation,
  PickupCancellationConfirmationPOJO,
  Transaction,
} from "@shipengine/integration-platform-sdk";
import { Session } from "./session";

/**
 * Cancels one or more previously-scheduled pickups
 */
export default async function cancelPickups(
  transaction: Transaction<Session>,
  pickups: PickupCancellation[],
): Promise<PickupCancellationConfirmationPOJO[]> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // STEP 4: Create the output data that ShipEngine expects
}
