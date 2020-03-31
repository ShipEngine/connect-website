"use strict";

const config = {

  type: "carrier",
  name: "My Carrier",
  description: "My Carrier description goes here",
  url: "https://www.my-carrier.com",
  logo: "./logo.svg",

  deliveryServices: "./configs/delivery-services.yaml",
  pickupServices: "./configs/pickup-services.yaml",

  registrationForm: "./configs/registration-form.json",
  settingsForm: "./configs/settings-form.json",

  requestPickup () {}

};

module.exports = config;
