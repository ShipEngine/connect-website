import humanize from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { InlineOrReference, InlineOrReferenceArray, PackagingConfig } from "@shipengine/ipaas";
import { getCwd } from "../file-utils";
import { readArrayConfig, readConfig } from "../read-config";

/**
 * Reads the config for a packaging type
 */
export async function readPackingConfig(config: InlineOrReference<PackagingConfig>, cwd: string): Promise<PackagingConfig> {
  try {
    return await readConfig(config, "packaging", cwd);
  }
  catch (error) {
    throw ono(error, `Error reading the packaging config: ${humanize(config)}`);
  }
}

/**
 * Reads the config for an array of packaging types
 */
export async function readPackingArrayConfig(config: InlineOrReferenceArray<PackagingConfig>, cwd: string): Promise<PackagingConfig[]> {
  try {
    const arrayItemCwd = getCwd(config, cwd);

    let arrayConfig = await readArrayConfig(config, "delivery_services,", cwd);
    const dereferencedArray = [];

    for (let item of arrayConfig) {
      const dereferencedConfig = await readPackingConfig(item, arrayItemCwd);
      dereferencedArray.push(dereferencedConfig);
    }
    return dereferencedArray;
  }
  catch (error) {
    throw ono(error, `Error reading the packaging config: ${humanize(config)}`);
  }
}
