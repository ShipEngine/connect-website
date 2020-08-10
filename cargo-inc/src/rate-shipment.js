"use strict";

const apiClient = require("./mock-api/client");
const codeIdMap = require("./code-id-map");

/**
 * Generates shipping rates for a shipment
 */
async function rateShipment(transaction, shipment) {
  // STEP 1: Validation
  // TODO: add any validation logic here

  // STEP 2: Create the data that the carrier's API expects
  let data = {
    operation: "quote_rates",
    session_id: transaction.session.id,
    service_code: shipment.deliveryService.identifiers.apiCode,
    confirmation_code: shipment.deliveryConfirmation.identifiers.apiCode,
    parcel_codes: shipment.packages[0].packaging.identifiers.apiCode,
    ship_date: shipment.shipDateTime.toISOString(),
    delivery_date: shipment.deliveryDateTime.toISOString(),
    from_zone: parseInt(shipment.shipFrom.postalCode, 10),
    to_zone: parseInt(shipment.shipTo.postalCode, 10),
    total_weight: shipment.packages[0].weight.ounces,
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return response.data.map(formatRate);
}

/**
 * Formats a rate quote in the way ShipEngine expects
 */
function formatRate(rate) {
  return {
    deliveryService: {
      id: codeIdMap[rate.service_code],
    },
    shipDateTime: new Date(rate.ship_date),
    deliveryDateTime: new Date(rate.delivery_date),
    isTrackable: rate.service_code !== "ECO",
    deliveryConfirmation: {
      id: codeIdMap[rate.confirmation_code],
    },
    packages: [{
      packaging: {
        id: codeIdMap[rate.parcel_code],
      },
    }],
    charges: [
      {
        name: "Service Charge",
        type: "shipping",
        amount: {
          value: rate.shipment_cost,
          currency: "USD"
        }
      },
      {
        name: "Confirmation Fee",
        type: "delivery_confirmation",
        amount: {
          value: rate.confirmation_cost,
          currency: "USD"
        }
      },
      {
        name: "Transport Tax",
        type: "tax",
        amount: {
          value: rate.tax_cost,
          currency: "USD"
        }
      },
    ],
  };
}

module.exports = rateShipment;
