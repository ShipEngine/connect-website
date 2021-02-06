import Config from "./config";
import { readFile, FileError } from "../../utils/read-file";
import validateConfig, { ValidateConfigError } from "./validate-config";

export const LoadAndValidateConfigError = { ...ValidateConfigError, ...FileError };

export async function loadAndValidateConfig(
  pathToApp: string,
): Promise<Config> {
  const config = await readFile<Config>(`${pathToApp}/connect.config.js`);

  validateConfig(config);

  return config;
}
