import { CarrierDefinition } from "@shipengine/integration-platform-sdk";

const carrier: CarrierDefinition = {
  id: "<%- _uuidv4 %>",
  name: "<%- pjson.name %>",
  description: "<%- pjson.description %>",
  websiteURL: "https://example-carrier.com",
  logo: "./logo.svg",
  cancelPickups: import("./methods/cancel-pickups"),
  createShipment: import("./methods/create-shipment"),
  rateShipment: import("./methods/rate-shipment"),
  schedulePickup: import("./methods/schedule-pickup"),
  pickupServices: [],
  deliveryServices: [],
};

export default carrier;
