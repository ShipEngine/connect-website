"use strict";

module.exports = {
  id: "2c24a88f-a6ab-4082-9761-674e9280d5f8",
  name: "Standard Ground",
  description: "5 - 7 day ground service to any NAFTA trade country",
  class: "ground",
  grade: "standard",
  serviceArea: "international",
  isConsolidationService: true,
  allowsMultiplePackages: true,
  isTrackable: true,
  labelFormats: ["pdf"],
  labelSizes: ["4x8"],
  originCountries: ["US", "CA", "MX"],
  destinationCountries: ["US", "CA", "MX"],

  packaging: [
    "../packaging/box.js",
    "../packaging/pallet.js",
  ],

  deliveryConfirmations: [
    "../delivery-confirmations/photo.js",
    "../delivery-confirmations/receipt.js",
    "../delivery-confirmations/signature.js",
  ],

  localization: {
    es: {
      name: "Suelo Estandard",
      description: "Servicio terrestre de 5 a 7 días a cualquier país comercial del TLCAN",
    },
    fr: {
      name: "Terrain Standard",
      description: "Service au sol de 5 à 7 jours vers n'importe quel pays commercial de l'ALENA",
    },
  },
};
