import { AppManifestPOJO, CarrierAppPOJO, ErrorCode, OrderAppPOJO } from "@shipengine/integration-platform-sdk";
import * as path from "path";
import { error } from "./internal";
import { App } from "./types";

const sdk = "@shipengine/integration-platform-sdk";

/**
 * A version of the SDK
 */
export interface SDK {
  version: number;
  CarrierApp: new (pojo: CarrierAppPOJO) => App;
  OrderApp: new (pojo: OrderAppPOJO) => App;
}


/**
 * Loads the version of the SDK that's needed by the app
 */
export async function loadSDK(appPath: string, manifest: AppManifestPOJO): Promise<SDK> {
  try {
    let version = getSdkVersion(manifest);

    if (version >= 0 && version < 1) {
      // Import the 0.x version of the SDK
      let { CarrierApp, OrderApp } = await import("@shipengine/integration-platform-sdk");
      return { version, CarrierApp, OrderApp };
    }
    else {
      throw error(ErrorCode.Validation, `Unsupported ${sdk} version: ${version}`);
    }
  }
  catch (originalError) {
    let manifestPath = path.join(appPath, "package.json");
    throw error(ErrorCode.AppError, `Error in ${manifestPath}:`, { originalError });
  }
}


/**
 * Returns the SDK version number that the app needs
 */
function getSdkVersion(manifest: AppManifestPOJO): number {
  let dependencies = manifest.dependencies || {};
  let devDependencies = manifest.devDependencies || {};

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
  return versionNumber;
}
