"use strict";

module.exports = {
  dataSchema: {
    title: "FreightCo Settings",
    description: "Update your FreightCo account settings",
    type: "object",
    required: [
      "default_currency",
      "deliver_duties_paid"
    ],
    properties: {
      default_currency: {
        title: "Default currency",
        type: "string",
        enum: [
          "USD",
          "CAD",
          "AUD",
          "NZD",
          "GBP",
          "EUR"
        ]
      },
      deliver_duties_paid: {
        title: "Include duties & taxes in label cost",
        type: "boolean"
      }
    }
  },
  uiSchema: {
    default_currency: {
      "ui:autofocus": true
    }
  }
};
