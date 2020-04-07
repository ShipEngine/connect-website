import { ono } from "@jsdevtools/ono";
import { AppManifest, DeliveryService, Form, Logo, PickupService, ShippingProviderApp, ShippingProviderConfig } from "@shipengine/ipaas";
import callsites from "callsites";
import * as path from "path";
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
  // const reqPath = require.resolve(moduleId);
  const pathToModule = path.join(callPath, "..", appPath);
  const moduleDir = path.parse(pathToModule).dir;

  let manifest = await readManifest(moduleDir);
  let config = await readConfig<AppConfig>(pathToModule);

  switch (config.type) {
    case "shipping_provider":
      // config = await ShippingProviderApp.readConfig(config, moduleDir);
      config = await derferenceShippingProviderApp(config, pathToModule);
      return new ShippingProviderApp(manifest, config);

    default:
      throw new Error(``);
  }
}


async function derferenceShippingProviderApp(config: AppConfig, cwd = "."): Promise<ShippingProviderConfig> {

  const appDir = path.parse(cwd).dir;

  return {
    ...config,
    logo: await Logo.readConfig(config.logo, appDir),
    deliveryServices: await DeliveryService.readArrayConfig(config.deliveryServices, appDir),
    pickupServices: config.pickupServices && await PickupService.readArrayConfig(config.pickupServices, appDir),
    loginForm: await Form.readConfig(config.loginForm, "loginForm", appDir),
    settingsForm: config.settingsForm && await Form.readConfig(config.settingsForm, "settingsForm", appDir),
    login: await readConfig(config.login),
    requestPickup: await readConfig(config.requestPickup),
    cancelPickup: await readConfig(config.cancelPickup),
    createLabel: await readConfig(config.createLabel),
    voidLabel: await readConfig(config.voidLabel),
    getRates: await readConfig(config.getRates),
    getTrackingUrl: await readConfig(config.getTrackingUrl),
    track: await readConfig(config.track),
    createManifest: await readConfig(config.createManifest),
  };

}


/**
 * Reads the ShipEngine IPaaS shipping provider app manifest (package.json file)
 */
async function readManifest(appPath: string): Promise<AppManifest> {
  let manifestPath = path.join(appPath, "package.json");

  try {
    return await readConfig<AppManifest>(manifestPath, "package.json");
  }
  catch (error) {
    throw ono(error, `Error reading the ShipEngine IPaaS app: ${manifestPath}`);
  }
}
