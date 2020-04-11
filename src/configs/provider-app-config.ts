import { ShippingProviderConfig } from "@shipengine/ipaas";
import { readConfigValue } from "../read-config";
import { readDeliveryServiceArrayConfig } from "./delivery-service-config";
import { readFormConfig } from "./form-config";
import { readLogoConfig } from "./logo-config";
import { readPickupServiceArrayConfig } from "./pickup-service-config";

/**
 * Reads the config for a ShipEngine IPaaS shipping provider
 */
export async function readShippingProviderConfig(config: ShippingProviderConfig, cwd: string): Promise<ShippingProviderConfig> {
  return {
    ...config,
    logo: await readLogoConfig(config.logo, cwd, "shipping provider logo"),
    deliveryServices: await readDeliveryServiceArrayConfig(config.deliveryServices, cwd),
    pickupServices: config.pickupServices && await readPickupServiceArrayConfig(config.pickupServices, cwd),
    loginForm: await readFormConfig(config.loginForm, cwd, "login form"),
    settingsForm: config.settingsForm && await readFormConfig(config.settingsForm, cwd, "settings form"),
    login: config.login
      && await readConfigValue(config.login, cwd, "login function"),
    requestPickup: config.requestPickup
      && await readConfigValue(config.requestPickup, cwd, "requestPickup function"),
    cancelPickup: config.cancelPickup
      && await readConfigValue(config.cancelPickup, cwd, "cancelPickup function"),
    createLabel: config.createLabel
      && await readConfigValue(config.createLabel, cwd, "createLabel function"),
    voidLabel: config.voidLabel
      && await readConfigValue(config.voidLabel, cwd, "voidLabel function"),
    getRates: config.getRates
      && await readConfigValue(config.getRates, cwd, "getRates function"),
    getTrackingUrl: config.getTrackingUrl
      && await readConfigValue(config.getTrackingUrl, cwd, "getTrackingUrl function"),
    track: config.track
      && await readConfigValue(config.track, cwd, "track function"),
    createManifest: config.createManifest
      && await readConfigValue(config.createManifest, cwd, "createManifest function"),
  };
}
