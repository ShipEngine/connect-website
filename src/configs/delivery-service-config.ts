import humanize from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { DeliveryServiceConfig, InlineOrReference, InlineOrReferenceArray } from "@shipengine/integration-platform-sdk";
import { readConfig, readConfigValue } from "../read-config";
import { readDeliveryConfirmationArrayConfig } from "./delivery-confirmation-config";
import { readPackingArrayConfig } from "./packaging-config";

/**
 * Reads the config for a delivery service
 */
export async function readDeliveryServiceConfig(config: InlineOrReference<DeliveryServiceConfig>, cwd: string): Promise<DeliveryServiceConfig> {
  [config, cwd] = await readConfig(config, cwd, "delivery service");

  try {
    return {
      ...config,
      originCountries: await readConfigValue(config.originCountries, cwd, "origin countries"),
      destinationCountries: await readConfigValue(config.destinationCountries, cwd, "destination countries"),
      packaging: await readPackingArrayConfig(config.packaging, cwd),
      deliveryConfirmations: config.deliveryConfirmations
        && await readDeliveryConfirmationArrayConfig(config.deliveryConfirmations, cwd),
    };
  }
  catch (error) {
    throw ono(error, `Invalid delivery service config: ${humanize(config)}`);
  }
}

/**
 * Reads the config for an array of delivery services
 */
export async function readDeliveryServiceArrayConfig(config: InlineOrReferenceArray<DeliveryServiceConfig>, cwd: string): Promise<DeliveryServiceConfig[]> {
  [config, cwd] = await readConfig(config, cwd, "delivery services");

  if (Array.isArray(config)) {
    config = await Promise.all(
      config.map((service) => readDeliveryServiceConfig(service, cwd))
    );
  }

  return config as DeliveryServiceConfig[];
}
