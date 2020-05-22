import { AppManifestPOJO, ErrorCode } from "@shipengine/integration-platform-sdk";
import * as path from "path";
import { error } from "./internal";
import { readDefinition } from "./read-definition";


/**
 * Reads a ShipEngine Integration Platform app manifest (package.json file)
 */
export async function readAppManifest(appPath: string): Promise<AppManifestPOJO> {
  let manifestPath = path.join(appPath, "package.json");
  let [manifest] = await readDefinition<AppManifestPOJO>(manifestPath, ".", "ShipEngine Integration Platform app");
  validateSdkVersion(manifest, manifestPath);
  return manifest;
}


/**
 * Ensures that the app uses a supported version of the ShipEngine Integration Platform SDK
 */
function validateSdkVersion(manifest: AppManifestPOJO, manifestPath: string): void {
  const sdk = "@shipengine/integration-platform-sdk";
  let dependencies = manifest.dependencies || {};
  let devDependencies = manifest.devDependencies || {};

  try {
    let versionString = dependencies[sdk] || devDependencies[sdk];
    if (!versionString) {
      throw error(ErrorCode.Validation,
        `The ShipEngine Integration Platform SDK (${sdk}) must be listed as a dependency or devDependency.`);
    }

    let versionParts = /^\W*(\d+\.\d+)\./.exec(versionString);
    if (!versionParts) {
      throw error(ErrorCode.Validation, `Invalid ${sdk} version: ${versionString}`);
    }

    let versionNumber = Number.parseFloat(versionParts[1]);
    if (versionNumber < 0 || versionNumber >= 1) {
      throw error(ErrorCode.Validation, `Unsupported ${sdk} version: ${versionString}`);
    }
  }
  catch (originalError) {
    throw error(ErrorCode.AppError, `Error in ${manifestPath}:`, { originalError });
  }
}
