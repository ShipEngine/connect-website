"use strict";

module.exports = {
  id: "<%- _uuidv4 %>",
  name: "<%- pjson.name %>",
  description: "<%- pjson.description %>",
  logo: "./logo.svg",
  websiteURL: "https://example-carrier.com",
  cancelPickup: "./methods/cancel-pickup.js",
  createLabel: "./methods/create-label.js",
  getRates: "./methods/get-rates.js",
  schedulePickup: "./methods/schedule-pickup.js",
  deliveryServices: [],
};
