"use strict";

module.exports = {
  id: "<%- _uuidv4 %>",
  name: "Example Delivery Service",
  description:
    "This is an example delivery service. Please remove and define your own.",
  class: "ground",
  deliveryConfirmations: ["./example-delivery-confirmation.js"],
  grade: "standard",
  isInsurable: true,
  isTrackable: false,
  labelFormats: ["pdf"],
  labelSizes: ["4x8"],
  originCountries: ["US", "CA", "MX"],
  destinationCountries: ["US", "CA", "MX"],
  packaging: ["./example-packaging.js"],
  serviceArea: "international",
};
