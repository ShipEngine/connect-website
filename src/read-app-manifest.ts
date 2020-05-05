import { ono } from "@jsdevtools/ono";
import { AppPOJO } from "@shipengine/integration-platform-sdk";
import * as path from "path";
import { readDefinition } from "./read-definition";


/**
 * Reads a ShipEngine Integration Platform app manifest (package.json file)
 */
export async function readAppManifest(appPath: string): Promise<AppPOJO> {
  let manifestPath = path.join(appPath, "package.json");
  let [manifest] = await readDefinition<AppPOJO>(manifestPath, ".", "ShipEngine Integration Platform app");
  validateSdkVersion(manifest, manifestPath);
  return manifest;
}


/**
 * Ensures that the app uses a supported version of the ShipEngine Integration Platform SDK
 */
function validateSdkVersion(manifest: AppPOJO, manifestPath: string): void {
  const sdk = "@shipengine/integration-platform-sdk";
  let dependencies = manifest.dependencies || {};
  let devDependencies = manifest.devDependencies || {};

  try {
    let versionString = dependencies[sdk] || devDependencies[sdk];
    if (!versionString) {
      throw new Error(`The ShipEngine Integration Platform SDK (@shipengine/integration-platform-sdk) must be listed as a dependency or devDependency.`);
    }

    let versionParts = /^(\d+\.\d+)\./.exec(versionString);
    if (!versionParts) {
      throw new Error(`Invalid @shipengine/integration-platform-sdk version: ${versionString}`);
    }

    let versionNumber = Number.parseFloat(versionParts[1]);
    if (versionNumber < 0 || versionNumber >= 1) {
      throw new RangeError(`Unsupported @shipengine/integration-platform-sdk version: ${versionString}`);
    }
  }
  catch (error) {
    throw ono(error, `Error in ${manifestPath}:`);
  }
}
