"use strict";

const config = {

  type: "carrier",
  name: "My Carrier",
  description: "My Carrier description goes here",
  url: "https://www.my-carrier.com",
  logo: "../logo.svg",

  deliveryServices: "../configs/delivery-services/delivery-services.yaml",
  pickupServices: "../configs/pickup-services/pickup-services.yaml",

  registrationForm: "../configs/forms/registration-form.json",
  settingsForm: "../configs/forms/settings-form.json",

  requestPickup () {}

};

module.exports = config;
