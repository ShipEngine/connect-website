import { ono } from "@jsdevtools/ono";
import { ShippingProviderApp, ShippingProviderConfig } from "@shipengine/ipaas";
import { readShippingProviderConfig } from "./configs/provider-app-config";
import { readAppManifest } from "./read-app-manifest";
import { readConfig } from "./read-config";


/**
 * A ShipEngine IPaaS app
 */
export type App = ShippingProviderApp; // | OrderSourceApp

/**
 * A ShipEngine IPaaS app config
 */
export type AppConfig = ShippingProviderConfig; // | OrderSourceConfig

/**
 * Load a ShipEngine IPaaS shipping provider app
 */
export async function loadApp(appPath: string): Promise<App> {
  try {
    // Read the app's manifest (package.json file)
    let manifest = await readAppManifest(appPath);

    // Read the app's exported config
    let [config, configPath] = await readConfig<AppConfig>(appPath, ".", "ShipEngine IPaaS app");

    // Create the corresponding ShipEngine IPaaS app type
    switch (config.type) {
      case "shipping_provider":
        config = await readShippingProviderConfig(config, configPath);
        return new ShippingProviderApp(manifest, config);

      default:
        throw new Error(`Unknown app type: ${config.type}`);
    }
  }
  catch (error) {
    throw ono(error, `Error loading the ShipEngine IPaaS app:`);
  }
}
