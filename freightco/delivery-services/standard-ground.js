"use strict";

module.exports = {
  id: "2c24a88f-a6ab-4082-9761-674e9280d5f8",
  identifiers: {
    apiCode: "STD"
  },
  name: "Standard Ground",
  description: "5 - 7 day ground service to any NAFTA trade country",
  class: "ground",
  grade: "standard",
  supportsReturns: true,
  serviceArea: "international",
  isConsolidationService: true,
  allowsMultiplePackages: true,
  isTrackable: true,
  manifestType: "digital",
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
  ]
};
