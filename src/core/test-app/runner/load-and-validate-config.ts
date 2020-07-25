import Config from "./config";
import { readFile } from "../../utils/read-file";

export async function loadAndValidateConfig(
  pathToApp: string,
): Promise<Config> {
  let config: Config = {};

  try {
    config = await readFile<Config>(`${pathToApp}/shipengine.config.js`);

    validate(config);

    return config;
  } catch (error) {
    // Check for sdk error
    if (error.error) {
      throw error.error;
    } else {
      throw error;
    }
  }
}

/**
 * TODO - This is probably going to be complex enough that it deserves a real validation library
 * Make sure that the shipengine.config.js file contains the expected methods
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
    "rateShipment_with_multiple_services",
    "rateShipment_with_one_service",
    "schedulePickup",
    "trackShipment",
  ];

  for (let key of Object.keys(config)) {
    if (!rootLevelKey.includes(key)) {
      throw new Error(
        `Invalid shipengine.config.js file, unrecognized property: ${key}`,
      );
    }

    if (config.tests) {
      for (let [key] of Object.entries(config.tests)) {
        if (!testKeys.includes(key)) {
          throw new Error(
            `Invalid shipengine.config.js file, unrecognized property: ${key}`,
          );
        }
      }
    }
  }
}
