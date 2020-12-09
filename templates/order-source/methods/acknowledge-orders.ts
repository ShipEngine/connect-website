import { AcknowledgedSalesOrder, SalesOrderNotification, Transaction } from "@shipengine/connect";
import { Session } from "./session";

/**
 * Called when an order has been imported into a marketplace.
 *
 * View documentation here:
 * https://connect.shipengine.com/docs/reference/methods/acknowledge-orders
 *
 * View sample implementation here:
 * https://github.com/ShipEngine/connect-samples/blob/master/iBuy/src/methods/acknowledge-orders.ts
 */

export default async function acknowledgeOrders(
  transaction: Transaction<Session>,
  notifications: SalesOrderNotification[],
): Promise<AcknowledgedSalesOrder[]> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the order's API expects
  // STEP 3: Call the orders's API
  // Step 4: Create the output data that ShipEngine expects
}
