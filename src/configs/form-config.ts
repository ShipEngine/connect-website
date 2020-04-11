import humanize from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { FormConfig, InlineOrReference } from "@shipengine/ipaas";
import { readConfig, readConfigValue } from "../read-config";

/**
 * Reads the config for a form
 */
export async function readFormConfig(config: InlineOrReference<FormConfig>, cwd: string, fieldName: string): Promise<FormConfig> {
  [config, cwd] = await readConfig(config, cwd, fieldName);

  try {
    return {
      ...config,
      dataSchema: await readConfigValue(config.dataSchema, cwd, `${fieldName} data schema`),
      uiSchema: await readConfigValue(config.uiSchema, cwd, `${fieldName} UI schema`),
    };
  }
  catch (error) {
    throw ono(error, `Invalid ${fieldName} config: ${humanize(config)}`);
  }
}
