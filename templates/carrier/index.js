"use strict";

module.exports = {
  id: "<%- _uuidv4 %>",
  name: "<%- pjson.name %>",
  description: "<%- pjson.description %>",
  logo: "./logo.svg",
  websiteURL: "https://example-carrier.com",
  cancelPickups: "./methods/cancel-pickups.js",
  createShipment: "./methods/create-shipment.js",
  rateShipment: "./methods/rate-shipment.js",
  schedulePickup: "./methods/schedule-pickup.js",
  pickupServices: [],
  deliveryServices: [],
};
