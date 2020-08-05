import { CarrierAppDefinition, ManifestType, ManifestLocation, ManifestShipment } from "@shipengine/integration-platform-sdk";

const parcelPost: CarrierAppDefinition = {
  id: "1cd8dc3b-3acb-4373-b32a-d59abd5ec86b",
  name: "Parcel Post",
  description: "Parcel Post provides low-cost multi-carrier delivery services within the U.S. and to major international destinations",
  websiteURL: "https://parcel-post.net",
  logo: "../logo.svg",
  icon: "../logo.svg",
  manifestType: ManifestType.Digital,
  manifestLocations: ManifestLocation.SingleLocation,
  manifestShipments: ManifestShipment.AllShipments,

  connect: import("./methods/connect"),
  createShipment: import("./methods/create-shipment"),
  createManifest: import("./methods/create-manifest"),
  rateShipment: import("./methods/rate-shipment"),
  schedulePickup: import("./methods/schedule-pickup"),
  cancelPickups: import("./methods/cancel-pickups"),

  connectionForm: import("./forms/connect"),
  settingsForm: import("./forms/settings"),

  pickupServices: import("./definitions/pickup-services"),

  deliveryServices: [
    import("./definitions/delivery-services/same-day"),
    import("./definitions/delivery-services/domestic-economy"),
    import("./definitions/delivery-services/domestic-standard"),
    import("./definitions/delivery-services/international-economy"),
    import("./definitions/delivery-services/international-priority"),
  ],
};

export default parcelPost;
