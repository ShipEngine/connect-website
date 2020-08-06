import {
  ManifestConfirmation,
  NewManifest,
  Transaction,
} from "@shipengine/integration-platform-sdk";
import { Session } from "./session";

/**
 * Creates an end-of-day manifest
 */
export default async function createManifest(
  transaction: Transaction<Session>,
  manifest: NewManifest,
): Promise<ManifestConfirmation> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // STEP 4: Create the output data that ShipEngine expects
}
