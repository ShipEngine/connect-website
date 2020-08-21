import { AppManifestPOJO } from "@shipengine/connect-sdk/lib/internal";
import * as path from "path";
import { readDefinition } from "./read-definition";


/**
 * Reads a ShipEngine Connect app manifest (package.json file)
 */
export async function readAppManifest(appPath: string): Promise<AppManifestPOJO> {
  const manifestPath = path.join(appPath, "package.json");
  const [manifest] = await readDefinition<AppManifestPOJO>(manifestPath, ".", "ShipEngine Connect app");
  return manifest;
}
