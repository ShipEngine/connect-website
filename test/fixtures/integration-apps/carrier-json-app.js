"use strict";

const config = {

  type: "shipping_provider",
  name: "My Carrier",
  description: "My Carrier description goes here",
  websiteURL: "https://www.my-carrier.com",
  logo: {
    blackAndWhiteSVG: "../logo.svg",
    colorSVG: "../logo.svg"
  },

  deliveryServices: "../configs/delivery-services/delivery-services.json",
  pickupServices: "../configs/pickup-services/pickup-services.json",

  registrationForm: "../configs/forms/registration-form.json",
  settingsForm: "../configs/forms/settings-form.json",

  requestPickup () {}

};

module.exports = config;
