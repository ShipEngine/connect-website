import { Transaction, SalesOrderIdentifier, SalesOrderPOJO } from "@shipengine/integration-platform-sdk";
import { Session } from "./session";


/**
 * Retrieve an individual sales order
 */
export default async function getSalesOrder(
  transaction: Transaction<Session>,
  salesOrder: SalesOrderIdentifier,
): Promise<SalesOrderPOJO> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // Step 4: Create the output data that ShipEngine expects
}
