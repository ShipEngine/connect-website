import { ono } from "@jsdevtools/ono";
import { AppManifest, ShippingProviderApp, ShippingProviderConfig } from "@shipengine/ipaas";
// tslint:disable-next-line: match-default-export-name
import callsites from "callsites";
import * as path from "path";
import { readDeliveryServiceArrayConfig } from "./configs/delivery-service-config";
import { readFormConfig } from "./configs/form-config";
import { readLogoConfig } from "./configs/logo-config";
import { readPickupServiceArrayConfig } from "./configs/pickup-service-config";
import { readConfig } from "./read-config";


/**
 * A ShipEngine IPaaS app
 */
type App = ShippingProviderApp; // | OrderSourceApp

type AppConfig = ShippingProviderConfig; // | OrderSourceConfig

/**
 * Load a ShipEngine IPaaS shipping provider app
 */
export async function loadApp(appPath: string): Promise<App> {

  const callPath = callsites()[1].getFileName();
  if (!callPath) {
    throw new Error(`Unable to find app config: ${callPath}`);
  }
  // TODO: Figure out why require.resolve isn't working and remove callsites
  // const reqPath = require.resolve(appPath);
  const pathToModule = path.join(callPath, "..", appPath);
  const moduleDir = path.parse(pathToModule).dir;

  let manifest = await readManifest(moduleDir);
  let config = await readConfig<AppConfig>(pathToModule);

  switch (config.type) {
    case "shipping_provider":
      try {
        config = await dereferenceShippingProviderApp(config, pathToModule);
      }
      catch (e) {
        const error = e as Error;
        throw new Error(`Error dereferencing Shipping Provider App: ${error.message}`);
      }
      return new ShippingProviderApp(manifest, config);

    default:
      throw new Error(`Incorrect app type: ${config.type}`);
  }
}


async function dereferenceShippingProviderApp(config: AppConfig, cwd = "."): Promise<ShippingProviderConfig> {

  const appDir = path.parse(cwd).dir;

  return {
    ...config,
    logo: await readLogoConfig(config.logo, appDir),
    deliveryServices: await readDeliveryServiceArrayConfig(config.deliveryServices, appDir),
    pickupServices: config.pickupServices && await readPickupServiceArrayConfig(config.pickupServices, appDir),
    loginForm: await readFormConfig(config.loginForm, "loginForm", appDir),
    settingsForm: config.settingsForm && await readFormConfig(config.settingsForm, "settingsForm", appDir),
    login: await readConfig(config.login, "login", appDir),
    requestPickup: await readConfig(config.requestPickup, "requestPickup", appDir),
    cancelPickup: await readConfig(config.cancelPickup, "cancelPickup", appDir),
    createLabel: await readConfig(config.createLabel, "createLabel", appDir),
    voidLabel: await readConfig(config.voidLabel, "voidLabel", appDir),
    getRates: await readConfig(config.getRates, "getRates", appDir),
    getTrackingUrl: await readConfig(config.getTrackingUrl, "getTrackingUrl", appDir),
    track: await readConfig(config.track, "track", appDir),
    createManifest: await readConfig(config.createManifest, "createManifest", appDir),
  };

}


/**
 * Reads the ShipEngine IPaaS shipping provider app manifest (package.json file)
 */
async function readManifest(appPath: string): Promise<AppManifest> {
  let manifestPath = path.join(appPath, "..", "package.json");

  // TODO: This currently only supports a package.json that is one directory above the config file
  // need to make this more robust and finding different package.json locations

  try {
    return await readConfig<AppManifest>(manifestPath, "package.json");
  }
  catch (error) {
    throw ono(error, `Error reading the ShipEngine IPaaS app: ${manifestPath}`);
  }
}
