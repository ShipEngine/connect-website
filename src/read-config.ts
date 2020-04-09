import { InlineOrReference, InlineOrReferenceArray } from "@shipengine/ipaas";
import { getCwd, isFilePath, loadConfigOrModuleFiles } from "./file-utils";

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
export async function readConfig<T>(config: InlineOrReference<T>, fieldName = "config", cwd = "."): Promise<T> {

  // TODO: use fieldName to provide more helpful errors
  if (isFilePath(config)) {
    let result = await loadConfigOrModuleFiles<T>(config, cwd);

    if (typeof result === "object" || typeof result === "function") {
      return result as T;
    }
  }

  return config as T;
}

/**
 * Reads an ShipEngine IPaaS config that is expected to be an array of values or other configs.
 * Each config can be any of:
 *
 *    - an inline value
 *    - a YAML file path
 *    - a JSON file path
 *    - a JavaScript file path
 *    - a TypeScript file path
 *    - a dynamic import via `require()` or `import()`
 */
export async function readArrayConfig<T>(config: InlineOrReferenceArray<T>, fieldName = "config list", cwd = "."): Promise<T[]> {

  let arrayCwd = getCwd(config, cwd);

  // TODO: use fieldName to provide more helpful errors

  if (Array.isArray(config)) {
    const resolvedArray = [];
    for (let item of config) {
      if (isFilePath(item)) {
        const resolvedItem = await readConfig(item, undefined, arrayCwd);
        resolvedArray.push(resolvedItem);
      }
      else {
        resolvedArray.push(item);
      }
    }

    return resolvedArray as T[];
  }
  else {
    let array = await loadConfigOrModuleFiles(config as string, cwd) as unknown[];
    const resolvedArray = [];
    for (let item of array) {
      const resolvedItem = await readConfig(item, undefined, arrayCwd);
      resolvedArray.push(resolvedItem);
    }

    return resolvedArray as T[];
  }
}
