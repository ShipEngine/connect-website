import { App } from "@shipengine/ipaas-types";
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
export async function ipaasLoader(options: Options): Promise<App> {
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

  return importedModule as App;
}

async function crawlAndLoadModule(module: App, pathToModule: string) {

  // Load all module properties
  for (let [key, value] of Object.entries(module)) {

    // Load any JSON files
    if (typeof value === "string") {

      if (value.endsWith(".json")) {
        const jsonPath = path.join(pathToModule, "..", value);
        const json = JSON.parse(await fs.promises.readFile(jsonPath, "utf-8"));

        // @ts-ignore
        module[key] = json;
      }

      // Load any YAML files
      if (value.endsWith(".yaml") || value.endsWith(".yml")) {
        const yamlPath = path.join(pathToModule, "..", value);
        const yamlText = await fs.promises.readFile(yamlPath, "utf-8");
        const json = jsYaml.safeLoad(yamlText);

        // @ts-ignore
        module[key] = json;
      }
    }
  }
}
