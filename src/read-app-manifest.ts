import { AppManifestPOJO } from "@shipengine/integration-platform-sdk";
import * as path from "path";
import { readDefinition } from "./read-definition";


/**
 * Reads a ShipEngine Integration Platform app manifest (package.json file)
 */
export async function readAppManifest(appPath: string): Promise<AppManifestPOJO> {
  let manifestPath = path.join(appPath, "package.json");
  let [manifest] = await readDefinition<AppManifestPOJO>(manifestPath, ".", "ShipEngine Integration Platform app");
  return manifest;
}
