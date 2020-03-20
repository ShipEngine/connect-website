import { Config } from "@shipengine/ipaas-types";
import * as callsites from "callsites";
import * as fs from "fs";
import * as jsYaml from "js-yaml";
import * as path from "path";
import { Options, Settings } from "./settings";

/**
 * Compile an IPaaS Integration into a single exported POJO
 *
 * @returns - Options
 */
export async function ipaasLoader(options: Options): Promise<Config> {
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

  await crawlAndLoadModule(importedModule as Config, pathToModule);

  return importedModule as Config;
}

async function crawlAndLoadModule(module: Config, pathToModule: string) {
  await loadModuleProperty(module, "services", pathToModule);
  await loadModuleProperty(module, "packageTypes", pathToModule);
}

async function loadModuleProperty(module: Config, property: "services" | "packageTypes", pathToModule: string) {

  // Load any JSON files
  let moduleProperty = module[property];
  if (isString(moduleProperty)) {

    if (moduleProperty.endsWith(".json")) {
      const jsonPath = path.join(pathToModule, "..", moduleProperty);
      const json = JSON.parse(await fs.promises.readFile(jsonPath, "utf-8"));

      // tslint:disable-next-line: no-unsafe-any
      module[property] = json;
    }

    // Load any YAML files
    if (moduleProperty.endsWith(".yaml") || moduleProperty.endsWith(".yml")) {
      const yamlPath = path.join(pathToModule, "..", moduleProperty);
      const yamlText = await fs.promises.readFile(yamlPath, "utf-8");
      const json = jsYaml.safeLoad(yamlText);

      // tslint:disable-next-line: no-unsafe-any
      module[property] = json;
    }
  }
}


function isString(item: unknown): item is string {
  return typeof item === "string";
}
