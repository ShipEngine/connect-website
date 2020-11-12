"use strict";

const { flatRatePackaging, largePaddedEnvelope } = require("../package-types");


const groundService = {
  default: {
    id: "2a20b066-71c3-11ea-bc55-0242ac130003",

    name: "Ground",

    availableCountries: [
      "US"
    ],

    packaging: [
      flatRatePackaging,
      largePaddedEnvelope
    ]
  }
};

module.exports = new Promise((res) => {
  res(groundService);
});
