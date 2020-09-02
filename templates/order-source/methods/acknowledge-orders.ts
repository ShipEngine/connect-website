import { Transaction, SalesOrderNotification, AcknowledgedSalesOrder } from "@shipengine/connect-sdk";
import { Session } from "./session";


/**
 * Called when an order has been imported into a marketplace.
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
