"use strict";

module.exports = {
  id: "43fc9d24-6a89-428a-ad34-c614c14170b6",
  identifiers: {
    apiCode: "INTL"
  },
  name: "International Ground",
  description: "3-day ground delivery to any NAFTA trade country",
  class: "three_day",
  grade: "expedited",
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
  ]
};
