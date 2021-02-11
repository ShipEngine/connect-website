import {
    Rate, RateCriteria,

    Transaction
} from "@shipengine/connect";
import { Session } from "./session";

/**
 * Generates shipping rates for a shipment
 * View documentation here:
 * https://connect.shipengine.com/docs/reference/methods/rate-shipment
 *
 * View sample implementation here:
 * https://github.com/ShipEngine/connect-samples/blob/master/parcel-post/carrier/src/methods/rate-shipment.ts
 */
export default async function rateShipment(
  transaction: Transaction<Session>,
  shipment: RateCriteria,
): Promise<Rate[]> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // STEP 4: Create the output data that ShipEngine expects
}
