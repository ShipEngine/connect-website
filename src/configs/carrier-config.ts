import humanize from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { CarrierConfig, InlineOrReference } from "@shipengine/ipaas";
import { readConfig } from "../read-config";
import { readLogoConfig } from "./logo-config";

/**
 * Reads the config for a ShipEngine IPaaS carrier
 */
export async function readCarrierConfig(config: InlineOrReference<CarrierConfig>, cwd: string): Promise<CarrierConfig> {
  [config, cwd] = await readConfig(config, cwd, "carrier");

  try {
    return {
      ...config,
      logo: await readLogoConfig(config.logo, cwd, "carrier logo"),
    };
  }
  catch (error) {
    throw ono(error, `Invalid carrier config: ${humanize(config)}`);
  }
}
