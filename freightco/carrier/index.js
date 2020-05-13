"use strict";

module.exports = {
  id: "29291ae9-99f6-4a74-baa1-84058c3e28d2",
  name: "FreightCo",
  description: "FreightCo is a ground freight trucking company serving Central and North America.",
  websiteURL: "https://freightco.net",
  logo: "../logo.svg",

  createShipment: "create-shipment.js",
  rateShipment: "rate-shipment.js",

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
