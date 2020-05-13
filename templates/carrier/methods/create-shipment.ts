import {
  NewShipment,
  ShipmentConfirmationPOJO,
  Transaction,
} from "@shipengine/integration-platform-sdk";
import { Session } from "./session";

/**
 * Generates a shipping label and tracking number for a shipment
 */
export default async function createShipment(
  transaction: Transaction<Session>,
  shipment: NewShipment,
): Promise<ShipmentConfirmationPOJO> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // STEP 4: Create the output data that ShipEngine expects
}
