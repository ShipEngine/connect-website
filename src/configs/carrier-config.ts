import humanize from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { CarrierConfig, InlineOrReference, InlineOrReferenceArray } from "@shipengine/integration-platform-sdk";
import { readConfig } from "../read-config";
import { readDeliveryServiceArrayConfig } from "./delivery-service-config";
import { readLogoConfig } from "./logo-config";
import { readPickupServiceArrayConfig } from "./pickup-service-config";

/**
 * Reads the config for a ShipEngine Integration Platform carrier
 */
export async function readCarrierConfig(config: InlineOrReference<CarrierConfig>, cwd: string): Promise<CarrierConfig> {
  [config, cwd] = await readConfig(config, cwd, "carrier");

  try {
    return {
      ...config,
      logo: await readLogoConfig(config.logo, cwd, "carrier logo"),
      deliveryServices: await readDeliveryServiceArrayConfig(config.deliveryServices, cwd),
      pickupServices: config.pickupServices && await readPickupServiceArrayConfig(config.pickupServices, cwd),
    };
  }
  catch (error) {
    throw ono(error, `Invalid carrier config: ${humanize(config)}`);
  }
}

/**
 * Reads the config for an array of carriers
 */
export async function readCarrierArrayConfig(config: InlineOrReferenceArray<CarrierConfig>, cwd: string): Promise<CarrierConfig[]> {
  [config, cwd] = await readConfig(config, cwd, "carriers");

  if (Array.isArray(config)) {
    config = await Promise.all(
      config.map((carrier) => readCarrierConfig(carrier, cwd))
    );
  }

  return config as CarrierConfig[];
}
