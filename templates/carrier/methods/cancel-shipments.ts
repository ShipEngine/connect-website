import {
  ShipmentCancellation,
  ShipmentCancellationOutcome,
  Transaction,
} from "@shipengine/integration-platform-sdk";
import { Session } from "./session";

/**
 * Cancels one or more shipments that were previously created. Depending on the carrier,
 * this may include voiding labels, refunding charges, and/or removing the shipment from the day's manifest.
 * 
 * View documentation here:
 * https://shipenginestag:439bd542@shipenginestag.wpengine.com/docs/integration-platform/reference/methods/cancel-shipments
 * 
 * View sample implementation here: 
 * https://github.com/ShipEngine/shipengine-integration-platform-sample-apps/blob/master/parcel-post/src/methods/cancel-shipments.ts
 */
export default async function cancelShipments(
  transaction: Transaction<Session>,
  shipments: ShipmentCancellation[],
): Promise<ShipmentCancellationOutcome[]> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // STEP 4: Create the output data that ShipEngine expects
}
