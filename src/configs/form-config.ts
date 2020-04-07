import humanize from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { FormConfig, InlineOrReference } from "@shipengine/ipaas";
import { readConfig } from "../read-config";

/**
 * Reads the config for a form
 */
export async function readFormConfig(config: InlineOrReference<FormConfig>, fieldName: string, cwd = "."): Promise<FormConfig> {
  try {
    config = await readConfig(config, fieldName, cwd);

    return {
      ...config,
      dataSchema: await readConfig(config.dataSchema),
      uiSchema: await readConfig(config.uiSchema),
    };
  }
  catch (error) {
    throw ono(error, `Error reading the form config: ${humanize(config)}`);
  }
}
