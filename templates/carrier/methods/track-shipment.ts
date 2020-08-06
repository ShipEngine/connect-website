import {
  TrackingCriteria,
  TrackingInfo,
  Transaction,
} from "@shipengine/integration-platform-sdk";
import { Session } from "./session";

/**
 * Returns tracking information for a shipment
 */
export default async function trackShipment(
  transaction: Transaction<Session>,
  shipment: TrackingCriteria,
): Promise<TrackingInfo> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // STEP 4: Create the output data that ShipEngine expects
}
