"use strict";

module.exports = {
  id: "ec3dc540-b733-4816-83a8-1455ee2bdadc",
  name: "FreightCo",
  description: "FreightCo is a ground freight trucking company serving Central and North America.",
  websiteURL: "https://freightco.net",
  logo: "../logo.svg",
  icon: "../logo.svg",

  connect: "connect.js",
  createShipment: "create-shipment.js",
  rateShipment: "rate-shipment.js",

  cancelPickups: "cancel-pickups.js",
  schedulePickup: "schedule-pickup.js",

  connectionForm: "forms/connect.js",
  settingsForm: "forms/settings.js",

  deliveryServices: [
    "delivery-services/international-ground.js",
    "delivery-services/standard-ground.js",
  ],

  pickupServices: [
    "pickup-services/drop-off.js",
    "pickup-services/flex-pickup.js",
    "pickup-services/next-day.js",
    "pickup-services/same-day.js"
  ]


};
