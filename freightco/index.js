"use strict";

module.exports = {
  name: "FreightCo",
  description: "FreightCo is a ground freight trucking company serving Central and North America.",
  websiteURL: "https://freightco.net",
  logo: "../logo.svg",

  connect: "connect.js",
  createShipment: "create-shipment.js",
  rateShipment: "rate-shipment.js",

  connectionForm: "forms/connect.js",
  settingsForm: "forms/settings.js",

  deliveryServices: [
    "delivery-services/international-ground.js",
    "delivery-services/standard-ground.js",
  ],

  localization: {
    es: {
      description: "FreightCo es una compañía de transporte terrestre de carga que sirve a Centro y Norte América.",
      websiteURL: "https://freightco.ca",
    },
    fr: {
      description: "FreightCo est une entreprise de camionnage de fret terrestre desservant l'Amérique centrale et l'Amérique du Nord.",
      websiteURL: "https://freightco.com.mx",
    },
  },
};
