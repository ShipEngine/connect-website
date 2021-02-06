import { SalesOrders, SalesOrderTimeRange, Transaction } from "@shipengine/connect";
import { Session } from "./session";


/**
 * Retrieve existing sales orders based on a date range.
 *
 * View documentation here:
 * https://connect.shipengine.com/docs/reference/methods/get-sales-orders-by-date
 *
 * View sample implementation here:
 * https://github.com/ShipEngine/connect-samples/blob/master/iBuy/src/methods/get-sales-orders-by-date.ts
 *
 */
export default async function getSalesOrdersByDate(
  transaction: Transaction<Session>,
  range: SalesOrderTimeRange,
): Promise<SalesOrders> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the order's API expects
  // STEP 3: Call the order's API
  // Step 4: Create the output data that ShipEngine expects
}
