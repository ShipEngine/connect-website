import Config from "./config";
import { readFile } from "../../utils/read-file";

export async function loadAndValidateConfig(
  pathToApp: string,
): Promise<Config> {
  let config: Config = {};

  try {
    config = await readFile<Config>(`${pathToApp}/connect.config.js`);

    validate(config);

    return config;
  } catch (error) {
    const err = error as Error & { error: object};
    // Check for sdk error
    if (err.error) {
      throw err.error;
    } else {
      throw err;
    }
  }
}

/**
 * TODO - This is probably going to be complex enough that it deserves a real validation library
 * Make sure that the connect.config.js file contains the expected methods
 */
function validate(config: Config): void {
  const rootLevelKey = [
    "connectArgs",
    "debug",
    "failFast",
    "retries",
    "session",
    "tests",
    "timeout",
  ];

  const testKeys = [
    "cancelPickups",
    "cancelShipments",
    "createManifest",
    "createShipment_domestic",
    "createShipment_global",
    "createShipment_international",
    "createShipment_multi_package",
    "createShipment_regional",
    "createShipment_with_insurance",
    "createShipment_return",
    "rateShipment",
    "cancelShipment",
    "schedulePickup",
    "trackShipment",
  ];

  for (const key of Object.keys(config)) {
    if (!rootLevelKey.includes(key)) {
      throw new Error(
        `Invalid connect.config.js file, unrecognized property: ${key}`,
      );
    }

    if (config.tests) {
      for (const [key] of Object.entries(config.tests)) {
        if (!testKeys.includes(key)) {
          throw new Error(
            `Invalid connect.config.js file, unrecognized property: ${key}`,
          );
        }
      }
    }
  }
}
