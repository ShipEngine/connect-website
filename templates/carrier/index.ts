import { CarrierDefinition } from "@shipengine/integration-platform-sdk";

const carrier: CarrierDefinition = {
  id: "<%- _uuidv4 %>",
  name: "<%- pjson.name %>",
  description: "<%- pjson.description %>",
  websiteURL: "https://example-carrier.com",
  logo: "./logo.svg",
  cancelPickup: import("./methods/cancel-pickup"),
  createLabel: import("./methods/create-label"),
  getRates: import("./methods/get-rates"),
  schedulePickup: import("./methods/schedule-pickup"),
  pickupServices: [],
  deliveryServices: [],
};

export default carrier;
