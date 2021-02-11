"use strict";

const { flatRatePackaging, largePaddedEnvelope } = require("../package-types");

module.export = {
  id: "2a20b066-71c3-11ea-bc55-0242ac130003",

  name: "Priority Overnight",

  availableCountries: [
    "US"
  ],

  packaging: [
    flatRatePackaging,
    largePaddedEnvelope
  ]
};
