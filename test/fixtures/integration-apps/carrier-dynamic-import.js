"use strict";

const config = {
  type: "shipping_provider",
  name: "My Carrier",
  description: "My Carrier description goes here",

  url: "https://www.my-carrier.com",

  logo: "./logo.svg",

  deliveryServices: [
    "../modules/delivery-services/ground-service",
    require("../modules/delivery-services/ground-service"),
    // import("../modules/delivery-services/ground-service"),
    {
      name: ""
    }
  ],

  pickupServices: [
    "../configs/pickup-services/one-time.yaml",
    "../configs/pickup-services/recurring.yaml",
    "../configs/pickup-services/drop-off.yaml",
  ],

  registrationForm: "../configs/forms/registration-form.json",

  settingsForm: "../configs/forms/settings-form.json",

  requestPickup () {}

};

module.exports = config;
