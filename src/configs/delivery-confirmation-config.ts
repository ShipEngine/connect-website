import { DeliveryConfirmationConfig, InlineOrReference, InlineOrReferenceArray } from "@shipengine/integration-platform-sdk";
import { readConfig, readConfigValue } from "../read-config";

/**
 * Reads the config for a delivery confirmation
 */
export async function readDeliveryConfirmationConfig(config: InlineOrReference<DeliveryConfirmationConfig>, cwd: string): Promise<DeliveryConfirmationConfig> {
  return readConfigValue(config, cwd, "delivery confirmation");
}

/**
 * Reads the config for an array of delivery confirmations
 */
export async function readDeliveryConfirmationArrayConfig(config: InlineOrReferenceArray<DeliveryConfirmationConfig>, cwd: string): Promise<DeliveryConfirmationConfig[]> {
  [config, cwd] = await readConfig(config, cwd, "delivery confirmations");

  if (Array.isArray(config)) {
    config = await Promise.all(
      config.map((service) => readDeliveryConfirmationConfig(service, cwd))
    );
  }

  return config as DeliveryConfirmationConfig[];
}
