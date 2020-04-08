import humanize from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { InlineOrReference, InlineOrReferenceArray, PickupService, PickupServiceConfig } from "@shipengine/ipaas";
import { getCwd, isFilePath } from "../file-utils";
import { readArrayConfig, readConfig } from "../read-config";
import { readCarrierConfig } from "./carrier-config";

/**
 * Reads the config for a pickup service
 */
export async function readPickupService(config: InlineOrReference<PickupServiceConfig>, cwd: string)
  : Promise<PickupServiceConfig> {
  try {

    const loadedConfig = await readConfig(config, "pickup_service", cwd);

    const newCwd = getCwd(config, cwd);

    return {
      ...loadedConfig,
      carrier: await readCarrierConfig(loadedConfig.carrier, newCwd)
    };

  }
  catch (error) {
    throw ono(error, `Error reading the pickup service config: ${humanize(config)}`);
  }
}

/**
 * Reads the config for an array of pickup services
 */
export async function readPickupServiceArrayConfig(config: InlineOrReferenceArray<PickupServiceConfig>, cwd: string)
  : Promise<PickupServiceConfig[]> {
  try {

    const arrayItemCwd = getCwd(config, cwd);
    let arrayConfig;

    if (typeof config === "string") {
      arrayConfig = await readArrayConfig(config, "pickup_services,", cwd);
    }
    else {
      arrayConfig = config;
    }
    const dereferencedArray = [];

    if (isPickupServiceConfigArray(arrayConfig)) {
      for (let item of arrayConfig) {
        const dereferencedConfig = await readPickupService(item, arrayItemCwd);
        dereferencedArray.push(dereferencedConfig);
      }
    }
    return dereferencedArray;
  }
  catch (error) {
    throw ono(error, `Error reading the pickup service config: ${humanize(config)}`);
  }
}

function isPickupServiceConfigArray(config: unknown): config is Array<InlineOrReference<PickupServiceConfig>> {
  return Array.isArray(config) && config.every((item) => isPickupService(item) || isFilePath(item));
}

function isPickupService(item: unknown): item is PickupServiceConfig {
  if (typeof item === "object" && item !== null) {
    return "id" in item &&
      "name" in item &&
      "carrier" in item;
  }

  return false;
}
