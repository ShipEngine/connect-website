import humanize from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { DeliveryServiceConfig, InlineOrReference, InlineOrReferenceArray } from "@shipengine/ipaas";
import { getCwd, isFilePath } from "../file-utils";
import { readArrayConfig, readConfig } from "../read-config";
import { readCarrierConfig } from "./carrier-config";
import { readDeliveryConfirmationArrayConfig } from "./delivery-confirmation-config";
import { readPackingArrayConfig } from "./packaging-config";

/**
 * Reads the config for a delivery service
 */
export async function readDeliveryServiceConfig(config: InlineOrReference<DeliveryServiceConfig>, cwd: string): Promise<DeliveryServiceConfig> {
  try {

    const loadedConfig = await readConfig(config, "delivery_service", cwd);

    const newCwd = getCwd(config, cwd);

    return {
      ...loadedConfig,
      originCountries: await readArrayConfig(loadedConfig.originCountries),
      destinationCountries: await readArrayConfig(loadedConfig.destinationCountries),
      carrier: await readCarrierConfig(loadedConfig.carrier, newCwd),
      packaging: await readPackingArrayConfig(loadedConfig.packaging, newCwd),
      deliveryConfirmations:
        loadedConfig.deliveryConfirmations
        && await readDeliveryConfirmationArrayConfig(loadedConfig.deliveryConfirmations, newCwd),
    };
  }
  catch (error) {
    throw ono(error, `Error reading the delivery service config: ${humanize(config)}`);
  }
}

/**
 * Reads the config for an array of delivery services
 */
export async function readDeliveryServiceArrayConfig(config: InlineOrReferenceArray<DeliveryServiceConfig>, cwd: string)
  : Promise<DeliveryServiceConfig[]> {
  try {

    const arrayItemCwd = getCwd(config, cwd);
    let arrayConfig;

    if (isFilePath(config)) {
      arrayConfig = await readArrayConfig(config, "delivery_services,", cwd);
    }
    else {
      // Don't do a generic dereference because sub-references will need the new cwd
      arrayConfig = config;
    }

    const dereferencedArray = [];

    if (isDeliveryServiceConfigArray(arrayConfig)) {
      for (let item of arrayConfig) {
        const dereferencedConfig = await readDeliveryServiceConfig(item, arrayItemCwd);
        dereferencedArray.push(dereferencedConfig);
      }
    }
    return dereferencedArray;
  }
  catch (error) {
    throw ono(error, `Error reading the packaging config: ${humanize(config)}`);
  }
}

function isDeliveryServiceConfigArray(config: unknown): config is Array<InlineOrReference<DeliveryServiceConfig>> {

  return Array.isArray(config) && config.every((item) => isDeliveryService(item) || isFilePath(item));
}

function isDeliveryService(item: unknown): item is DeliveryServiceConfig {
  if (typeof item === "object" && item !== null) {
    return "id" in item &&
      "name" in item &&
      "class" in item &&
      "grade" in item &&
      "originCountries" in item &&
      "destinationCountries" in item &&
      "carrier" in item &&
      "packaging" in item;
  }

  return false;
}
