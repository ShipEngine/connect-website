"use strict";

module.exports = {
  id: "b7528ebf-3169-4003-8174-c278ce353aa1",
  code: "eds",
  name: "Example Delivery Service",
  description:
    "This is an example delivery service. Please remove and define your own.",
  deliveryConfirmations: ["./example-delivery-confirmation.js"],
  manifestType: "digital",
  isInsurable: true,
  isTrackable: false,
  labelFormats: ["pdf"],
  labelSizes: ["4x8"],
  originCountries: ["US", "CA", "MX"],
  destinationCountries: ["US", "CA", "MX"],
  packaging: ["./example-packaging.js"],
  serviceArea: "international",
};
