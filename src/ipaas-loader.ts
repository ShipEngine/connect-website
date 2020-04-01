import { App, CarrierApp } from "@shipengine/ipaas-types";
import * as callsites from "callsites";
import * as fs from "fs";
import * as jsYaml from "js-yaml";
import * as path from "path";
import { Carrier } from "./carrier-app";
import { Options, Settings } from "./settings";

/**
 * Compile an IPaaS Integration into a single exported POJO
 *
 * @returns - Options
 */
export async function ipaasLoader(options: Options): Promise<Carrier> {
  // let settings = new Settings(options);

  if (!options || typeof options.pathToModule !== "string") {
    throw new Error("Module path not specified.");
  }

  let importedModule;
  // TODO: Research if there's a better way to do this.
  const callPath = callsites()[1].getFileName();
  const pathToModule = path.join(callPath as string, "..", options.pathToModule);

  try {
    importedModule = await import(pathToModule);
  }
  catch (e) {
    // tslint:disable-next-line: no-unsafe-any
    throw new Error(e);
  }

  await crawlAndLoadModule(importedModule as App, pathToModule);

  return new Carrier(importedModule as CarrierApp);
}

async function crawlAndLoadModule(module: App, pathToModule: string) {

  // Load all module properties
  for (let [key, value] of Object.entries(module)) {

    // Load any JSON files
    if (typeof value === "string") {

      const json = await loadJsonOrYaml(value, pathToModule);
      const parsedPath = path.parse(pathToModule);
      const newModulePath = path.join(parsedPath.dir, value);
      if (Array.isArray(json)) {
        await dereferenceArray(json, newModulePath, module, key);
      }
      else if (json) {
        // @ts-ignore
        module[key] = json;
      }
    }
    else if (Array.isArray(value)) {
      await dereferenceArray(value, pathToModule, module, key);
    }
  }
}


async function dereferenceArray(array: unknown[], pathToModule: string, module: object, key: string) {
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === "string") {
      const json = await loadJsonOrYaml(array[i] as string, pathToModule);
      array[i] = json;
    }
  }

  // @ts-ignore
  module[key] = array;
}

async function loadJsonOrYaml(filePath: string, pathToModule: string): Promise<object | undefined> {
  
  if (filePath.endsWith(".json")) {
    const jsonPath = path.join(pathToModule, "..", filePath);
    const json = JSON.parse(await fs.promises.readFile(jsonPath, "utf-8"));
    return json as object;
  }

  if (filePath.endsWith(".yaml") || filePath.endsWith(".yml")) {
    const yamlPath = path.join(pathToModule, "..", filePath);
    const yamlText = await fs.promises.readFile(yamlPath, "utf-8");
    const json = jsYaml.safeLoad(yamlText);
    return json as object;
  }

  return undefined;
}
