import humanize from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { DeliveryConfirmationConfig, InlineOrReference, InlineOrReferenceArray } from "@shipengine/ipaas";
import { getCwd } from "../file-utils";
import { readArrayConfig, readConfig } from "../read-config";

/**
 * Reads the config for a delivery confirmation
 */
async function readDeliveryConfirmationConfig(config: InlineOrReference<DeliveryConfirmationConfig>, cwd: string)
  : Promise<DeliveryConfirmationConfig> {
  try {
    return await readConfig(config, cwd);
  }
  catch (error) {
    throw ono(error, `Error reading the delivery confirmation config: ${humanize(config)}`);
  }
}

/**
 * Reads the config for an array of delivery confirmations
 */
export async function readDeliveryConfirmationArrayConfig(config: InlineOrReferenceArray<DeliveryConfirmationConfig>, cwd = ".")
  : Promise<DeliveryConfirmationConfig[]> {
  try {
    const arrayItemCwd = getCwd(config, cwd);

    const arrayConfig = await readArrayConfig(config, "delivery_confirmation,", cwd);
    const dereferencedArray = [];

    for (let item of arrayConfig) {
      const dereferencedConfig = await readDeliveryConfirmationConfig(item, arrayItemCwd);
      dereferencedArray.push(dereferencedConfig);
    }
    return dereferencedArray;
  }
  catch (error) {
    throw ono(error, `Error reading the delivery confirmation config: ${humanize(config)}`);
  }
}
