import * as fs from "fs";
import * as jsYaml from "js-yaml";
import * as path from "path";
import { register } from "ts-node";
import { ModuleKind } from "typescript";

register();

/**
 * Check is string has a JSON or YAML extension
 */
export function isFilePath(filePath: unknown): filePath is string {
  if (typeof filePath === "string") {
    if (filePath.endsWith(".json") || filePath.endsWith(".yaml") || filePath.endsWith(".yml")
      || filePath.endsWith(".js") || filePath.endsWith(".ts")) {
      return true;
    }
  }

  return false;
}

/**
 * Take the given file path, load the file contents, then parse and return it as a JSON object.
 */
export async function loadConfigOrModuleFiles<T>(filePath: string, currentDir: string): Promise<T | T[] | undefined> {

  if (filePath.endsWith(".json")) {
    const jsonPath = path.join(currentDir, filePath);
    let json;

    try {
      const results = await fs.promises.readFile(jsonPath, "utf-8");
      json = JSON.parse(results);
    }
    catch (e) {
      const error = e as Error;
      throw new Error(`Unable to open JSON file: ${error.message}`);
    }

    if (Array.isArray(json)) {
      return json as T[];
    }
    else {
      return json as T;
    }
  }

  else if (filePath.endsWith(".yaml") || filePath.endsWith(".yml")) {
    const yamlPath = path.join(currentDir, filePath);
    let yamlText;

    try {
      yamlText = await fs.promises.readFile(yamlPath, "utf-8");
    }
    catch (e) {
      const error = e as Error;
      throw new Error(`Unable to open YAML file: ${error.message}`);
    }

    const json = jsYaml.safeLoad(yamlText);
    if (Array.isArray(json)) {
      return json as T[];
    }
    else {
      return json as T;
    }
  }

  else if (filePath.endsWith(".js")) {
    const jsPath = path.join(currentDir, filePath);
    const json = await import(jsPath);
    if (isDefaultModuleExport<T>(json)) {
      if (Array.isArray(json.default)) {
        return json.default as T[];
      }
      else {
        return json.default;
      }
    }
    else {
      return json as T;
    }
  }

  else if (filePath.endsWith(".ts")) {
    const tsPath = path.join(currentDir, filePath);
    // tslint:disable-next-line: no-unsafe-any
    const module = await require(tsPath) as unknown;

    if (typeof module === "object" && module !== null) {
      const moduleKeys = Object.keys(module);
      if (moduleKeys.length === 1) {

        // @ts-ignore
        const moduleItem = module[moduleKeys[0]];
        // tslint:disable-next-line: no-unsafe-any
        return moduleItem;
      }
    }

    return undefined;
  }

  return undefined;
}

/**
 * Find the cwd of the property/cwd combination, if it's an inline object then the cwd
 * does not need to change, if it's a reference to another object then all references
 * within that config will need to be in relation to the new cwd
 */
export function getCwd(property: string | object, cwd: string): string {

  if (typeof property !== "string") {
    return cwd;
  }

  return path.parse(path.join(cwd, property)).dir;
}


function isDefaultModuleExport<T>(module: unknown): module is { default: T } {

  if (typeof module === "object" && module && "default" in module) {
    return true;
  }

  return false;
}
