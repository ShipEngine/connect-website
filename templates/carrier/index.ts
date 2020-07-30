import {
  CarrierAppDefinition,
  ManifestLocation,
  ManifestShipment,
  InlineOrReference,
  Connect,
  CancelPickups,
  CancelShipments,
  CreateManifest,
  CreateShipment,
  RateShipment,
  SchedulePickup,
  TrackShipment,
  DeliveryServiceDefinition,
} from "@shipengine/integration-platform-sdk";

const carrier: CarrierAppDefinition = {
  id: "<%- _uuidv4 %>",
  name: "<%- _appName %>",
  description: "<%- pjson.description %>",
  websiteURL: "http://www.carier-site.com",
  logo: "./logo.svg",
  icon: "./logo.svg",
  manifestLocations: ManifestLocation.SingleLocation,
  manifestShipments: ManifestShipment.ExplicitShipments,
  connectionForm: import("./forms/connect"),
  settingsForm: import("./forms/settings"),
  
  connect: import("./methods/connect"),
  cancelPickups: import("./methods/cancel-pickups"),
  cancelShipments: import("./methods/cancel-shipments"),
  createManifest: import("./methods/create-manifest"),
  createShipment: import("./methods/create-shipment"),
  rateShipment: import("./methods/rate-shipment"),
  schedulePickup: import("./methods/schedule-pickup"),
  trackShipment: import("./methods/track-shipment"),
  deliveryServices: [import("./definitions/example-delivery-service")],
  pickupServices: [],
};

export default carrier;
