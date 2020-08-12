import { Transaction, SalesOrderPOJO, SalesOrderTimeRange } from "@shipengine/connect-sdk";
import { Session } from "./session";


/**
 * Retrieve existing sales orders based on a date range.
 */
export default async function getSalesOrdersByDate(
  transaction: Transaction<Session>,
  range: SalesOrderTimeRange,
): Promise<Iterable<SalesOrderPOJO>> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // Step 4: Create the output data that ShipEngine expects
}
