"use strict";

module.exports = {
  id: "<%- _uuidv4 %>",
  name: "Example Delivery Service",
  code: "eds",
  description:
    "This is an example delivery service. Please remove and define your own.",
  deliveryConfirmations: ["./example-delivery-confirmation.js"],
  manifestType: "digital",
  isInsurable: true,
  isTrackable: false,
  labelFormats: ["pdf"],
  labelSizes: ["4x8"],
  availableCountries: ["US", "CA", "MX"],
  packaging: ["./example-packaging.js"],
  serviceArea: "international",
};
