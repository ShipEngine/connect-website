import {
  PickupCancellation,
  PickupCancellationConfirmationPOJO,
  Transaction,
} from "@shipengine/integration-platform-sdk";

/**
 * Cancels a previously-scheduled pickup
 */
export default async function cancelPickup(
  transaction: Transaction,
  cancellation: PickupCancellation,
): Promise<PickupCancellationConfirmationPOJO> {
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // STEP 4: Create the output data that ShipEngine expects
}
