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
  manifestLocations: ManifestLocation.SingleLocation,
  manifestShipments: ManifestShipment.ExplicitShipments,
  connectionForm: import("./forms/connect"),
  settingsForm: import("./forms/settings"),
  connect: import("./methods/connect") as InlineOrReference<Connect>,
  cancelPickups: import("./methods/cancel-pickups") as InlineOrReference<CancelPickups>,
  cancelShipments: import("./methods/cancel-shipments") as InlineOrReference<CancelShipments>,
  createManifest: import("./methods/create-manifest") as InlineOrReference<CreateManifest>,
  createShipment: import("./methods/create-shipment") as InlineOrReference<CreateShipment>,
  rateShipment: import("./methods/rate-shipment") as InlineOrReference<RateShipment>,
  schedulePickup: import("./methods/schedule-pickup") as InlineOrReference<SchedulePickup>,
  trackShipment: import("./methods/track-shipment") as InlineOrReference<TrackShipment>,
  deliveryServices: [import("./definitions/example-delivery-service") as InlineOrReference<DeliveryServiceDefinition>],
  pickupServices: [],
};

export default carrier;
