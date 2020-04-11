import { humanize } from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { DynamicImport, InlineOrReference } from "@shipengine/ipaas";
import * as path from "path";
import * as resolveFrom from "resolve-from";
import { readFile } from "./read-file";

/**
 * Reads an ShipEngine IPaaS config that is expected to be a single value.
 * The config can be any of:
 *
 *    - an inline value
 *    - a YAML file path
 *    - a JSON file path
 *    - a JavaScript file path
 *    - a TypeScript file path
 *    - a dynamic import via `require()` or `import()`
 */
export async function readConfigValue<T>(config: InlineOrReference<T>, cwd: string, fieldName: string): Promise<T> {
  let [value] = await readConfig(config, cwd, fieldName);
  return value;
}


/**
 * Reads an ShipEngine IPaaS config that is expected to be a single value.
 * The config can be any of:
 *
 *    - an inline value
 *    - a YAML file path
 *    - a JSON file path
 *    - a JavaScript file path
 *    - a TypeScript file path
 *    - a dynamic import via `require()` or `import()`
 *
 * @returns A tuple containing the config value and the directory path of the config file
 */
export async function readConfig<T>(config: InlineOrReference<T>, cwd: string, fieldName: string): Promise<[T, string]> {
  if (!config) {
    throw new TypeError(`Invalid ${fieldName}: ${humanize(config)}. Expected an inline value or file path.`);
  }

  try {
    if (typeof config === "string") {
      // The config value is a file path, so return the file's contents
      let filePath = resolve(config, cwd);
      let dir = path.dirname(filePath);
      let contents = await readFile(filePath) as T;
      return [contents, dir];
    }
    else if (isDynamicImport(config)) {
      // The config value is a dynamic import, so return the default export
      let exports = await config;
      return [exports.default, cwd];
    }
    else {
      // The config value was defined inline, so just return it as-is
      return [config, cwd];
    }
  }
  catch (error) {
    throw ono(error, `Invalid ${fieldName} config.`);
  }
}


/**
 * Resolves a Node.js Module ID or file path
 */
function resolve(moduleId: string, cwd: string): string {
  if (!moduleId.startsWith(".") && !path.isAbsolute(moduleId)) {
    // Relative paths must start with a "./"
    moduleId = "./" + moduleId;
  }

  return resolveFrom(cwd, moduleId);
}


/**
 * Determines whether the given value is a dynamically imported JavaScript module
 */
function isDynamicImport<T>(value: unknown): value is DynamicImport<T> {
  let dynamicImport = value as DynamicImport<T>;
  return value && typeof dynamicImport.then === "function";
}
