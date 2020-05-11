"use strict";

/**
 * Gets shipping rate quotes for the specified criteria
 */
async function getRates(transaction, criteria) {
  // STEP 1: Validation

  // STEP 2: Create the data that the carrier's API expects

  // STEP 3: Call the carrier's API
  // const response = some async network call

  // STEP 4: Create the output data that ShipEngine expects
  // return {
  //   rates: response.data.map(formatRate),
  // };

  return [];
}

/**
 * Formats a rate quote in the way ShipEngine expects
 */
function formatRate(rate) {
  return {
    deliveryServiceID: "",
    deliveryConfirmationID: "",
    packagingID: "",
    shipDateTime: "",
    deliveryDateTime: "",
    maximumDays: "",
    isGuaranteed: "",
    isTrackable: "",
    charges: [
      {
        name: "",
        type: "",
        code: "",
        amount: {
          value: "",
          currency: "",
        },
      },
    ],
  };
}

module.exports = getRates;
