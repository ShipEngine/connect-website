"use strict";

import { ShippingProviderConfig } from "@shipengine/ipaas";

/** Test Shipping Provider */
const config: ShippingProviderConfig = {

  type: "shipping_provider",
  id: "d54ea601-9374-425c-8732-1f9eae4eae18",
  name: "My Carrier",
  description: "My Carrier description goes here",
  websiteURL: "https://www.my-carrier.com",
  logo: {
    blackAndWhiteSVG: "../../../logo.svg",
    colorSVG: "../../../logo.svg"
  },

  loginForm: "../../../configs/forms/registration-form.json",
  settingsForm: "../../../configs/forms/settings-form.json",

  carriers: "../../../modules/carrier/carriers.ts",

  login: "../../../modules/methods/login.js",
  requestPickup: "../../../modules/methods/request-pickup.js",
  cancelPickup: "../../../modules/methods/cancel-pickup.js",
  createLabel: "../../../modules/methods/create-label.js",
  voidLabel: "../../../modules/methods/void-label.js",
  getRates: "../../../modules/methods/get-rates.js",
  getTrackingURL: "../../../modules/methods/get-tracking-url.js",
  track: "../../../modules/methods/track.js",
  createManifest: "../../../modules/methods/create-manifest.js"

};

// tslint:disable-next-line: no-default-export
export default config;
