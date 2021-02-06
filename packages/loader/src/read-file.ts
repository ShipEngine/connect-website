import { EcmaScriptModule } from "@shipengine/connect-sdk";
import { error, SystemErrorCode } from "@shipengine/connect-sdk/lib/internal";
import { promises as fs } from "fs";
import * as jsYaml from "js-yaml";
import * as json5 from "json5";
import * as path from "path";


/**
 * Reads a file based on its file extension
 */
export async function readFile<T>(filePath: string): Promise<T> {
  switch (path.extname(filePath)) {
    case ".yml":
    case ".yaml":
      return readYamlFile(filePath);

    case ".json":
    case ".jsonc":
    case ".json5":
      return readJsonFile(filePath);

    case ".js":
    case ".mjs":
      return importJavaScriptModule(filePath);
    case ".ts":
      throw new Error(`Invalid file reference "${filePath}. Reference the compiled Javascript file instead of the Typescript source file.`);

    default:
      return readTextFile(filePath) as unknown as T;
  }
}


/**
 * Returns the parsed contents of the specified YAML file
 */
async function readYamlFile<T>(filePath: string): Promise<T> {
  const yaml = await readTextFile(filePath);

  try {
    const parsedYaml = jsYaml.safeLoad(yaml, { filename: path.basename(filePath) }) as unknown;

    return parsedYaml as T;
  }
  catch (originalError: unknown) {
    throw error(SystemErrorCode.Syntax, `Unable to parse ${path.basename(filePath)}.`, { originalError });
  }
}


/**
 * Returns the parsed contents of the specified JSON file
 */
async function readJsonFile<T>(filePath: string): Promise<T> {
  const json = await readTextFile(filePath);

  try {
    return json5.parse(json) as T;
  }
  catch (originalError: unknown) {
    throw error(SystemErrorCode.Syntax, `Unable to parse ${path.basename(filePath)}.`, { originalError });
  }
}


/**
 * Returns the contents of the specified UTF-8 text file
 */
async function readTextFile(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, "utf8");
  }
  catch (originalError: unknown) {
    throw error(SystemErrorCode.Filesystem, `Unable to read ${filePath}.`, { originalError });
  }
}


/**
 * Returns the default export of the specified JavaScript module
 */
async function importJavaScriptModule<T>(filePath: string): Promise<T> {
  try {
    const exports = await import(filePath) as EcmaScriptModule;
    if ("default" in exports) {
      // This appears to be an ECMAScript module, so return its default export
      return exports.default as T;
    }
    else {
      // This appears to be a CommonJS module, so return the module exports
      return exports as unknown as T;
    }
  }
  catch (originalError: unknown) {
    throw error(SystemErrorCode.Filesystem, `Unable to import ${path.basename(filePath)}.`, { originalError });
  }
}
