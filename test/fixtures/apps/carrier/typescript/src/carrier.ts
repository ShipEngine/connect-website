/** Test Shipping Provider */
const config: CarrierAppDefinition = {

  id: "d54ea601-9374-425c-8732-1f9eae4eae18",
  name: "My Carrier",
  description: "My Carrier description goes here",
  websiteURL: "https://www.my-carrier.com",
  logo: "../../../../logo.svg",
  icon: "../../../../logo.svg",
  manifestType: "digital",
  manifestLocations: "single_location",
  manifestShipments: "explicit_shipments",

  deliveryServices: ["../../../../modules/delivery-services/ground-service.ts"],
  pickupServices: "../../../../configs/pickup-services/pickup-services.json",

  connectionForm: "../../../../configs/forms/registration-form.json",
  settingsForm: "../../../../configs/forms/settings-form.json",
  connect: "../../../../modules/methods/login.js",
  createShipment: "../../../../modules/methods/create-label.js",
  cancelShipments: "../../../../modules/methods/void-label.js",
  rateShipment: "../../../../modules/methods/get-rates.js",
  trackShipment: "../../../../modules/methods/track-shipment.js",
  createManifest: "../../../../modules/methods/create-manifest.js",
  schedulePickup: "../../../../modules/methods/request-pickup.js",
  cancelPickups: "../../../../modules/methods/cancel-pickup.js",

};

export default config;
