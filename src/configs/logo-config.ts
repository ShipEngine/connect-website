import humanize from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { InlineOrReference, LogoConfig } from "@shipengine/ipaas";
import * as fs from "fs";
import * as path from "path";
import { readConfig } from "../read-config";

/**
 * Reads the config for a ShipEngine IPaaS logo
 */
export async function readLogoConfig(config: InlineOrReference<LogoConfig>, cwd: string): Promise<LogoConfig> {
  try {
    config = await readConfig(config, undefined, cwd);

    const colorSVGPath = path.join(cwd, config.colorSVG as string);
    const blackAndWhiteSVGPath = path.join(cwd, config.blackAndWhiteSVG as string);

    const colorSVGBuffer = await fs.promises.readFile(colorSVGPath);
    const blackAndWhiteSVGBuffer = await fs.promises.readFile(blackAndWhiteSVGPath);

    return {
      ...config,
      colorSVG: colorSVGBuffer.toString(),
      blackAndWhiteSVG: blackAndWhiteSVGBuffer.toString(),
    };
  }
  catch (error) {
    throw ono(error, `Error reading the delivery service config: ${humanize(config)}`);
  }
}
