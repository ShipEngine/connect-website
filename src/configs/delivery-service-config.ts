import humanize from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { DeliveryServiceConfig, InlineOrReference, InlineOrReferenceArray } from "@shipengine/ipaas";
import { getCwd } from "../file-utils";
import { readArrayConfig, readConfig } from "../read-config";
import { readCarrierConfig } from "./carrier-config";
import { readDeliveryConfirmationArrayConfig } from "./delivery-confirmation-config";
import { readPackingArrayConfig } from "./packaging-config";

/**
 * Reads the config for a delivery service
 */
export async function readDeliveryServiceConfig(config: InlineOrReference<DeliveryServiceConfig>, cwd = "."): Promise<DeliveryServiceConfig> {
  try {
    config = await readConfig(config);

    return {
      ...config,
      originCountries: await readArrayConfig(config.originCountries),
      destinationCountries: await readArrayConfig(config.destinationCountries),
      carrier: await readCarrierConfig(config.carrier, cwd),
      packaging: await readPackingArrayConfig(config.packaging, cwd),
      deliveryConfirmations:
        config.deliveryConfirmations && await readDeliveryConfirmationArrayConfig(config.deliveryConfirmations),
    };
  }
  catch (error) {
    throw ono(error, `Error reading the delivery service config: ${humanize(config)}`);
  }
}

/**
 * Reads the config for an array of delivery services
 */
export async function readDeliveryServiceArrayConfig(config: InlineOrReferenceArray<DeliveryServiceConfig>, cwd = ".")
  : Promise<DeliveryServiceConfig[]> {
  try {

    const arrayItemCwd = getCwd(config, cwd);

    const arrayConfig = await readArrayConfig(config, "delivery_services,", cwd);
    const dereferencedArray = [];

    for (let item of arrayConfig) {
      const dereferencedConfig = await readDeliveryServiceConfig(item, arrayItemCwd);
      dereferencedArray.push(dereferencedConfig);
    }
    return dereferencedArray;
  }
  catch (error) {
    throw ono(error, `Error reading the packaging config: ${humanize(config)}`);
  }
}
