import { Transaction, SellerIdentifier, SellerPOJO } from "@shipengine/integration-platform-sdk";
import { Session } from "./session";

/**
 * Return an individual seller.
 */
export default async function getSeller(
  transaction: Transaction<Session>,
  seller: SellerIdentifier,
): Promise<SellerPOJO> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // Step 4: Create the output data that ShipEngine expects
}
