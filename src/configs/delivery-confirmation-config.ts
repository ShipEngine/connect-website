import humanize from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { DeliveryConfirmationConfig, InlineOrReference, InlineOrReferenceArray } from "@shipengine/ipaas";
import { getCwd, isFilePath } from "../file-utils";
import { readArrayConfig, readConfig } from "../read-config";

/**
 * Reads the config for an array of delivery confirmations
 */
export async function readDeliveryConfirmationArrayConfig(config: InlineOrReferenceArray<DeliveryConfirmationConfig>, cwd = ".")
  : Promise<DeliveryConfirmationConfig[]> {
  try {

    // Delivery Confirmation is currently a simple JSON object with zero nested dependencies, so a simple file read is sufficient
    const arrayConfig = await readArrayConfig(config, "delivery_confirmations", cwd);

    return arrayConfig;
  }
  catch (error) {
    throw ono(error, `Error reading the delivery confirmation config: ${humanize(config)}`);
  }
}

function isDeliveryConfirmationConfigArray(config: unknown)
  : config is Array<InlineOrReference<DeliveryConfirmationConfig>> {

  return Array.isArray(config) && config.every((item) => isDeliveryConfirmation(item) || isFilePath(item));
}

function isDeliveryConfirmation(item: unknown): item is DeliveryConfirmationConfig {
  if (typeof item === "object" && item !== null) {
    return "id" in item && "name" in item;
  }

  return false;
}
