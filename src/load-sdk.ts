/* eslint-disable @typescript-eslint/naming-convention */
import { ErrorCode } from "@shipengine/connect-sdk";
import { App, AppManifestPOJO, CarrierAppPOJO, error, OrderAppPOJO } from "@shipengine/connect-sdk/lib/internal";
import * as path from "path";

const sdk = "@shipengine/connect-sdk";

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
    const version = getSdkVersion(manifest);

    if (version >= 1) {
      // Import the 0.x version of the SDK
      const { CarrierApp, OrderApp } = await import("@shipengine/connect-sdk/lib/internal"); return { version, CarrierApp, OrderApp };
    }
    else {
      throw error(ErrorCode.Validation, `Unsupported ${sdk} version: ${version}`);
    }
  }
  catch (originalError) {
    const manifestPath = path.join(appPath, "package.json");
    throw error(ErrorCode.AppError, `Error in ${manifestPath}:`, { originalError });
  }
}


/**
 * Returns the SDK version number that the app needs
 */
function getSdkVersion(manifest: AppManifestPOJO): number {
  const dependencies = manifest.dependencies || {};
  const devDependencies = manifest.devDependencies || {};

  const versionString = dependencies[sdk] || devDependencies[sdk];
  if (!versionString) {
    throw error(ErrorCode.Validation,
      `The ShipEngine Connect SDK (${sdk}) must be listed as a dependency or devDependency.`);
  }

  const versionParts = /^\W*(\d+\.\d+)\./.exec(versionString);
  if (!versionParts) {
    throw error(ErrorCode.Validation, `Invalid ${sdk} version: ${versionString}`);
  }

  const versionNumber = Number.parseFloat(versionParts[1]);
  return versionNumber;
}
