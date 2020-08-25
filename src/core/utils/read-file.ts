import {
  EcmaScriptModule,
  ErrorCode,
} from "@shipengine/connect-sdk";
import { promises as fs } from "fs";
import * as jsYaml from "js-yaml";
import * as json5 from "json5";
import * as path from "path";
import { error as sdkError } from "@shipengine/connect-sdk/lib/internal";

/**
 * Returns the contents of the specified UTF-8 text file
 */
async function readTextFile(absoluteFilePath: string): Promise<string> {
  try {
    return await fs.readFile(absoluteFilePath, "utf8");
  } catch (error) {
    const err = error as Error;
    throw sdkError(
      ErrorCode.Filesystem,
      `Unable to read ${absoluteFilePath}.`,
      {
        err,
      },
    );
  }
}

/**
 * Returns the parsed contents of the specified YAML file
 */
async function readYamlFile<T>(absoluteFilePath: string): Promise<T> {
  const yaml = await readTextFile(absoluteFilePath);

  try {
    const parsedYaml = jsYaml.safeLoad(yaml, { filename: path.basename(absoluteFilePath) }) as unknown;

    return parsedYaml as T;
  } catch (error) {
    const err = error as Error;
    throw sdkError(
      ErrorCode.Syntax,
      `Unable to parse ${path.basename(absoluteFilePath)}.`,
      { err },
    );
  }
}

/**
 * Returns the parsed contents of the specified JSON file
 */
async function readJsonFile<T>(absoluteFilePath: string): Promise<T> {
  const json = await readTextFile(absoluteFilePath);

  try {
    return json5.parse(json) as T;
  } catch (error) {
    const err = error as Error;
    throw sdkError(
      ErrorCode.Syntax,
      `Unable to parse ${path.basename(absoluteFilePath)}.`,
      { err },
    );
  }
}

/**
 * Returns the default export of the specified JavaScript module
 */
async function importJavaScriptModule<T>(absoluteFilePath: string): Promise<T> {
  try {
    const exports = (await import(absoluteFilePath)) as EcmaScriptModule;
    if ("default" in exports) {
      // This appears to be an ECMAScript module, so return its default export
      return exports.default as T;
    }
    // This appears to be a CommonJS module, so return the module exports
    return (exports as unknown) as T;
  } catch (error) {
    const err = error as Error;
    throw sdkError(
      ErrorCode.Filesystem,
      `Unable to import ${path.basename(absoluteFilePath)}.`,
      { err },
    );
  }
}

/**
 * Reads a file based on its file extension
 */
export async function readFile<T>(absoluteFilePath: string): Promise<T> {
  if (!(path.resolve(absoluteFilePath) === path.normalize(absoluteFilePath))) {
    throw sdkError(ErrorCode.Filesystem, "Path must be absolute.");
  }

  switch (path.extname(absoluteFilePath)) {
    case ".yml":
    case ".yaml":
      return readYamlFile(absoluteFilePath);

    case ".json":
      return readJsonFile(absoluteFilePath);

    case ".js":
      return importJavaScriptModule(absoluteFilePath);

    default:
      return (readTextFile(absoluteFilePath) as unknown) as T;
  }
}
