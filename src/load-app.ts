import { ono } from "@jsdevtools/ono";
import { CarrierApp, CarrierDefinition, ConnectionApp, ConnectionDefinition, ErrorCode } from "@shipengine/integration-platform-sdk";
import { readCarrierDefinition } from "./definitions/read-carrier-definition";
import { readConnectionDefinition } from "./definitions/read-connection-definition";
import { fileCache } from "./file-cache";
import { readAppManifest } from "./read-app-manifest";
import { readDefinition } from "./read-definition";

/**
 * A ShipEngine Integration Platform app
 */
export type App = ConnectionApp | CarrierApp; // | OrderApp

/**
 * A ShipEngine Integration Platform app definition
 */
export type AppDefinition = ConnectionDefinition | CarrierDefinition; // | OrderDefinition

/**
 * Loads a ShipEngine Integration Platform App
 */
export async function loadApp(appPath: string = "."): Promise<App> {
  try {
    fileCache.startedLoading();

    // Read the app's manifest (package.json file)
    let manifest = await readAppManifest(appPath);

    // Read the app's exported definition
    let [definition, definitionPath] = await readDefinition<AppDefinition>(appPath, ".", "ShipEngine Integration Platform app");

    if ("deliveryServices" in definition) {
      let carrier = await readCarrierDefinition(definition, definitionPath, "carrier");
      return new CarrierApp({ ...manifest, carrier });
    }
    else {
      let connection = await readConnectionDefinition(definition, definitionPath, "connection");
      return new ConnectionApp({ ...manifest, connection });
    }
  }
  catch (error) {
    throw ono(error, { code: ErrorCode.Validation }, `Error loading the ShipEngine Integration Platform app:`);
  }
  finally {
    // Let the cache know that we're done loading the app,
    // so the cache can be cleared to free-up memory
    fileCache.finishedLoading();
  }
}
