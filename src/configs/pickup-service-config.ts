import { InlineOrReference, InlineOrReferenceArray, PickupServiceConfig } from "@shipengine/ipaas";
import { readConfig, readConfigValue } from "../read-config";

/**
 * Reads the config for a pickup service
 */
export async function readPickupServiceConfig(config: InlineOrReference<PickupServiceConfig>, cwd: string): Promise<PickupServiceConfig> {
  return readConfigValue(config, cwd, "pickup service");
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
