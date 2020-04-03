import validate from "@code-engine/validate";
import * as types from "@shipengine/ipaas-types";
import * as path from "path";
import { readLogo } from "../utils/files";
import { resolveAndPopulateArray } from "../utils/resolve-and-populate";
import { DeliveryService } from "./delivery-service";
import { Form } from "./form";
import { PickupService } from "./pickup-service";

/**
 * Carrier class that adds helper functions for Carrier integrations.
 */
export class CarrierApp {

  public type: "shipping_provider" = "shipping_provider";
  public name!: string;
  public description!: string;
  public websiteURL?: URL;
  public logo!: {
    colorSVG: Buffer;   // "png", "svg", "jpeg", etc.
    blackAndWhiteSVG: Buffer;
  };
  public deliveryServices: DeliveryService[] = [];
  public pickupServices?: PickupService[];
  public registrationForm?: Form;
  public settingsForm?: Form;

  public requestPickup?: types.RequestPickup;
  public cancelPickup?: types.CancelPickup;
  public createLabel?: types.CreateLabel;
  public voidLabel?: types.VoidLabel;
  public getRates?: types.GetRates;
  public getTrackingUrl?: types.GetTrackingUrl;
  public track?: types.Track;
  public createManifest?: types.CreateManifest;
  public login?: types.Login;

  private constructor() { }

  public get originCountries(): types.Country[] {
    let countries = new Set<types.Country>();

    for (let deliveryService of this.deliveryServices) {
      for (let country of deliveryService.originCountries) {
        countries.add(country);
      }
    }

    return [...countries];
  }

  /**
   * Imports and normalizes an IPaaS carrier app
   */
  public static async import(app: types.ShippingProviderApp, modulePath: string): Promise<CarrierApp> {

    const appDir = path.dirname(modulePath);

    CarrierApp.validate(app);
    let carrier = new CarrierApp();
    carrier.name = app.name;
    carrier.description = app.description || "";
    carrier.websiteURL = app.websiteURL ? new URL(app.websiteURL) : undefined;
    carrier.logo = {
      blackAndWhiteSVG: await readLogo(app.logo.blackAndWhiteSVG, appDir),
      colorSVG: await readLogo(app.logo.colorSVG, appDir)
    };

    const deliveryServices = await resolveAndPopulateArray<types.DeliveryService>(app.deliveryServices, appDir);

    let cwd = appDir;
    if (typeof app.deliveryServices === "string") {
      cwd = path.parse(path.join(appDir, app.deliveryServices)).dir;
    }

    const dsPromises = deliveryServices
      .map((ds: types.DeliveryService | string) => DeliveryService.import(ds, cwd));

    carrier.deliveryServices = await Promise.all(dsPromises);

    // carrier.pickupServices = app.pickupServices.map(async ps => await PickupService.import(ps));

    // carrier.registrationForm = app.registrationForm ? await Form.import(app.registrationForm) : undefined;
    // carrier.settingsForm = app.settingsForm ? await Form.import(app.settingsForm) : undefined;

    carrier.requestPickup = app.requestPickup ? app.requestPickup as types.RequestPickup : undefined;
    carrier.cancelPickup = app.cancelPickup ? app.cancelPickup as types.CancelPickup : undefined;

    carrier.createLabel = app.createLabel ? app.createLabel as types.CreateLabel : undefined;
    carrier.voidLabel = app.voidLabel ? app.voidLabel as types.VoidLabel : undefined;

    carrier.getRates = app.getRates ? app.getRates as types.GetRates : undefined;
    carrier.getTrackingUrl = app.getTrackingUrl ? app.getTrackingUrl as types.GetTrackingUrl : undefined;
    carrier.track = app.track ? app.track as types.Track : undefined;

    carrier.createManifest = app.createManifest ? app.createManifest as types.CreateManifest : undefined;
    carrier.login = app.login ? app.login as types.Login : undefined;

    return carrier;
  }

  /**
   * Ensure that the carrier app is correctly formatted.
   */
  public static validate(carrier: types.ShippingProviderApp) {
    validate.type(carrier, Object);
    validate.string(carrier.name);
    validate.type.oneOf(carrier.description, [String, undefined]);
    validate.type.oneOf(carrier.websiteURL, [String, undefined]);
    validate.type.object(carrier.logo);

    validate.type.oneOf(carrier.deliveryServices, [Array, String]);

    validate.type.oneOf(carrier.pickupServices, [Array, String, undefined]);
    validate.type.oneOf(carrier.login, [Object, String, undefined]);
    validate.type.oneOf(carrier.settingsForm, [Object, String, undefined]);

    validate.type.oneOf(carrier.requestPickup, [Function, String, undefined]);
    validate.type.oneOf(carrier.cancelPickup, [Function, String, undefined]);
    validate.type.oneOf(carrier.createLabel, [Function, String, undefined]);
    validate.type.oneOf(carrier.voidLabel, [Function, String, undefined]);

    validate.type.oneOf(carrier.getRates, [Function, String, undefined]);
    validate.type.oneOf(carrier.getTrackingUrl, [Function, String, undefined]);
    validate.type.oneOf(carrier.track, [Function, String, undefined]);

    validate.type.oneOf(carrier.createManifest, [Function, String, undefined]);
    validate.type.oneOf(carrier.login, [Function, String, undefined]);

    // TODO: Call validators for all the nested objects
    // DeliveryService.validate(carrier.deliveryServices);
    // PickupService.validate(carrier.pickupServices);
  }
}

