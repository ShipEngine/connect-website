import * as fs from "fs";
import * as jsYaml from "js-yaml";
import * as path from "path";

/**
 * Check is string has a JSON or YAML extension
 */
export function isFilePath(filePath: string): boolean {
  if (filePath.endsWith(".json") || filePath.endsWith(".yaml") || filePath.endsWith(".yml")) {
    return true;
  }

  return false;
}

/**
 * Take the given file path, load the file contents, then parse and return it as a JSON object.
 */
export async function loadJsonOrYaml<T>(filePath: string, currentDir: string): Promise<T | T[] | undefined> {

  if (filePath.endsWith(".json")) {
    const jsonPath = path.join(currentDir, filePath);
    let json;

    try {
      json = JSON.parse(await fs.promises.readFile(jsonPath, "utf-8"));
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

  if (filePath.endsWith(".yaml") || filePath.endsWith(".yml")) {
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

  return undefined;
}

export async function readLogo(filePath: string, appDir: string): Promise<Buffer> {

  let buffer;
  try {
    buffer = await fs.promises.readFile(path.join(appDir, filePath));
  }
  catch (e) {
    const error = e as Error;
    throw new Error(`Error loading Logo file: ${error.message}`);
  }


  return buffer;;
}
