import humanize from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { InlineOrReference, InlineOrReferenceArray, PickupService, PickupServiceConfig } from "@shipengine/ipaas";
import { getCwd } from "../file-utils";
import { readArrayConfig, readConfig } from "../read-config";
import { readCarrierConfig } from "./carrier-config";

/**
 * Reads the config for a pickup service
 */
export async function readPickupService(config: InlineOrReference<PickupServiceConfig>, cwd: string)
  : Promise<PickupServiceConfig> {
  try {

    config = await readConfig(config, cwd);

    return {
      ...config,
      carrier: await readCarrierConfig(config.carrier, cwd)
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
    const arrayConfig = await readArrayConfig(config, "pickup_services", cwd);
    const dereferencedArray = [];

    for (let item of arrayConfig) {
      const dereferencedConfig = await readPickupService(item, arrayItemCwd);
      dereferencedArray.push(dereferencedConfig);
    }
    return dereferencedArray;
  }
  catch (error) {
    throw ono(error, `Error reading the pickup service config: ${humanize(config)}`);
  }
}
