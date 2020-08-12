import { Transaction } from "@shipengine/integration-platform-sdk";
import { Session } from "./session";

interface ConnectionFormData {}

/**
 * Logs in using the username and password entered on the login form
 * 
 * View sample implementation here:
 * https://github.com/ShipEngine/shipengine-integration-platform-sample-apps/blob/master/parcel-post/src/methods/connect.ts
 */
export default async function connect(
  transaction: Transaction<Session>,
  connectionFormData: ConnectionFormData,
): Promise<void> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // STEP 4: Store session data in the transaction.session property,
  // which is persisted across all method calls
  // transaction.session = {};
}
