import {
  NewShipment,
  ShipmentConfirmation,
  Transaction,
} from "@shipengine/integration-platform-sdk";
import { Session } from "./session";

/**
 * Generates a shipping label and tracking number for a shipment
 *
 * View documentation here:
 * https://shipenginestag:439bd542@shipenginestag.wpengine.com/docs/integration-platform/reference/methods/create-shipment
 * 
 * View sample implementation here:
 * https://github.com/ShipEngine/shipengine-integration-platform-sample-apps/blob/master/parcel-post/carrier/src/methods/create-shipment.ts
 */
export default async function createShipment(
  transaction: Transaction<Session>,
  shipment: NewShipment,
): Promise<ShipmentConfirmation> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // STEP 4: Create the output data that ShipEngine expects
}
