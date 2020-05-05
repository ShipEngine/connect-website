import { InlineOrReference, InlineOrReferenceArray, PackagingConfig } from "@shipengine/integration-platform-sdk";
import { readConfig, readConfigValue } from "../read-config";

/**
 * Reads the config for a packaging type
 */
export async function readPackagingConfig(config: InlineOrReference<PackagingConfig>, cwd: string): Promise<PackagingConfig> {
  return readConfigValue(config, cwd, "packaging");
}

/**
 * Reads the config for an array of packaging types
 */
export async function readPackingArrayConfig(config: InlineOrReferenceArray<PackagingConfig>, cwd: string): Promise<PackagingConfig[]> {
  [config, cwd] = await readConfig(config, cwd, "packaging");

  if (Array.isArray(config)) {
    config = await Promise.all(
      config.map((packaging) => readPackagingConfig(packaging, cwd))
    );
  }

  return config as PackagingConfig[];
}
