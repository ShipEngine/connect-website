import humanize from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { DeliveryConfirmationConfig, InlineOrReference, InlineOrReferenceArray } from "@shipengine/ipaas";
import { readArrayConfig, readConfig } from "../read-config";

/**
 * Reads the config for a delivery confirmation
 */
async function readDeliveryConfirmationConfig(config: InlineOrReference<DeliveryConfirmationConfig>)
  : Promise<DeliveryConfirmationConfig> {
  try {
    return await readConfig(config);
  }
  catch (error) {
    throw ono(error, `Error reading the delivery confirmation config: ${humanize(config)}`);
  }
}

/**
 * Reads the config for an array of delivery confirmations
 */
export async function readDeliveryConfirmationArrayConfig(config: InlineOrReferenceArray<DeliveryConfirmationConfig>)
  : Promise<DeliveryConfirmationConfig[]> {
  try {
    return await readArrayConfig(config);
  }
  catch (error) {
    throw ono(error, `Error reading the delivery confirmation config: ${humanize(config)}`);
  }
}
