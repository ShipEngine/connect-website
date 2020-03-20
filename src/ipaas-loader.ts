import { Config } from "@shipengine/ipaas-types";
import * as fs from "fs";
import * as jsYaml from "js-yaml";
import * as path from "path";
import { Options, Settings } from "./settings";


/**
 * Compile an IPaaS Integration into a single exported POJO
 *
 * @returns - Options
 */
export async function ipaasLoader(options?: Options): Promise<Config> {
  let settings = new Settings(options);

  let importedModule;
  if (!options?.pathToModule) {
    throw new Error("Module path not specified.")
  }

  try {
    importedModule = await import(options.pathToModule);
  }
  catch (e) {
    // tslint:disable-next-line: no-unsafe-any
    throw new Error(e);
  }

  await crawlAndLoadModule(importedModule as Config);

  return importedModule;
}

async function crawlAndLoadModule(module: Config) {
  await loadModuleProperty(module.services);
  await loadModuleProperty(module.packageTypes);
}

async function loadModuleProperty(moduleProperty: unknown) {
  // Load any JSON files
  if (isString(moduleProperty) && moduleProperty.endsWith(".json")) {
    const jsonPath = path.join(process.cwd(), moduleProperty);
    const json = JSON.parse(await fs.promises.readFile(jsonPath, "utf-8"));
    moduleProperty = json;

  }

  // Load any YAML files
  if (isString(moduleProperty) && (moduleProperty.endsWith(".yaml") || moduleProperty.endsWith(".yml"))) {
    const yamlPath = path.join(process.cwd(), moduleProperty);
    const yamlText = await fs.promises.readFile(yamlPath, "utf-8");
    const json = jsYaml.safeLoad(yamlText);

    moduleProperty = json;
  }
}


function isString(item: unknown): item is string {
  if (typeof item === "string") {
    return true;
  }

  return false;
}
