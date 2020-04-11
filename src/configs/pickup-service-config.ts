import humanize from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { InlineOrReference, InlineOrReferenceArray, PickupServiceConfig } from "@shipengine/ipaas";
import { readConfig } from "../read-config";
import { readCarrierConfig } from "./carrier-config";

/**
 * Reads the config for a pickup service
 */
export async function readPickupServiceConfig(config: InlineOrReference<PickupServiceConfig>, cwd: string): Promise<PickupServiceConfig> {
  [config, cwd] = await readConfig(config, cwd, "pickup service");

  try {
    return {
      ...config,
      carrier: await readCarrierConfig(config.carrier, cwd),
    };

  }
  catch (error) {
    throw ono(error, `Invalid pickup service config: ${humanize(config)}`);
  }
}

/**
 * Reads the config for an array of pickup services
 */
export async function readPickupServiceArrayConfig(config: InlineOrReferenceArray<PickupServiceConfig>, cwd: string): Promise<PickupServiceConfig[]> {
  [config, cwd] = await readConfig(config, cwd, "pickup services");

  if (Array.isArray(config)) {
    config = await Promise.all(
      config.map((service) => readPickupServiceConfig(service, cwd))
    );
  }

  return config as PickupServiceConfig[];
}
