"use strict";

/**
 * Requests a shipping label from the provider
 */
async function createLabel(transaction, { format, size, shipment }) {
  // STEP 1: Do any necessary validation here

  // STEP 2: Create the data that the carrier's API expects

  // STEP 3: Call the carrier's API
  // const response = some async network call

  // STEP 4: Create the output data that ShipEngine expects
  // return await formatLabel(response.data);
  return {};
}

/**
 * Formats a label in the way ShipEngine expects
 */
async function formatLabel(label) {
  return {
    charges: [
      {
        type: "",
        amount: {
          value: "",
          currency: "",
        },
      },
    ],
    shipment: {
      trackingNumber: "",
      deliveryDateTime: "",
      packages: [
        {
          trackingNumber: "",
          label: {
            name: "",
            size: "",
            format: "",
          },
        },
      ],
    },
  };
}

module.exports = createLabel;
