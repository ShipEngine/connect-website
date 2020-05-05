import humanize from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { InlineOrReference, LogoConfig } from "@shipengine/integration-platform-sdk";
import { readConfig, readConfigValue } from "../read-config";

/**
 * Reads the config for a ShipEngine Integration Platform logo
 */
export async function readLogoConfig(config: InlineOrReference<LogoConfig>, cwd: string, fieldName: string): Promise<LogoConfig> {
  [config, cwd] = await readConfig(config, cwd, fieldName);

  try {
    return {
      ...config,
      colorSVG: await readConfigValue(config.colorSVG, cwd, `${fieldName} image`),
      blackAndWhiteSVG: await readConfigValue(config.blackAndWhiteSVG, cwd, `${fieldName} image`),
    };
  }
  catch (error) {
    throw ono(error, `Invalid ${fieldName} config: ${humanize(config)}`);
  }
}
