import {
  LabelConfirmationPOJO,
  LabelSpec,
  Transaction,
} from "@shipengine/integration-platform-sdk";

/**
 * Requests a shipping label for a shipment
 */
export default async function createLabel(
  transaction: Transaction,
  { format, size, shipment }: LabelSpec,
): Promise<LabelConfirmationPOJO> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // STEP 4: Create the output data that ShipEngine expects
}
