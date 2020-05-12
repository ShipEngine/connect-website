"use strict";

/** Test Shipping Provider */
const config: CarrierDefinition = {

  id: "d54ea601-9374-425c-8732-1f9eae4eae18",
  name: "My Carrier",
  description: "My Carrier description goes here",
  websiteURL: "https://www.my-carrier.com",
  logo: "../../../../logo.svg",

  deliveryServices: ["../../../../modules/delivery-services/ground-service.ts"],
  pickupServices: "../../../../configs/pickup-services/pickup-services.json",

  createLabel: "../../../../modules/methods/create-label.js",
  voidLabels: "../../../../modules/methods/void-label.js",
  getRates: "../../../../modules/methods/get-rates.js",
  track: "../../../../modules/methods/track.js",
  createManifest: "../../../../modules/methods/create-manifest.js",
  schedulePickup: "../../../../modules/methods/request-pickup.js",
  cancelPickup: "../../../../modules/methods/cancel-pickup.js",

};

// tslint:disable-next-line: no-default-export
export default config;
