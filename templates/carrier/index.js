"use strict";

module.exports = {
  id: "<%- _uuidv4 %>",
  name: "<%- pjson.name %>",
  description: "<%- pjson.description %>",
  logo: "./logo.svg",
  websiteURL: "https://example-carrier.com",
  cancelPickups: "./methods/cancel-pickups.js",
  cancelShipments: "./methods/cancel-shipments.js",
  createManifest: "./methods/create-manifest.js",
  createShipment: "./methods/create-shipment.js",
  rateShipment: "./methods/rate-shipment.js",
  schedulePickup: "./methods/schedule-pickup.js",
  trackShipment: "./methods/track-shipment.js",
  deliveryServices: [
    "./definitions/example-delivery-service.<%- _definitionExt %>",
  ],
  pickupServices: [],
};
