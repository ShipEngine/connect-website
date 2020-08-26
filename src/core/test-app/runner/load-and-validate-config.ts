import Config from "./config";
import { readFile } from "../../utils/read-file";
import validateConfig from "./validate-config";

export async function loadAndValidateConfig(
  pathToApp: string,
): Promise<Config> {
  const config = await readFile<Config>(`${pathToApp}/connect.config.js`);

  await validateConfig(config);

  return config;
}
