"use strict";

const apiClient = require("./mock-api/client");
const { idToCode, codeToID } = require("./id-code-map");

/**
 * Gets shipping rate quotes for the specified criteria
 */
async function getRates(transaction, criteria) {
  // STEP 1: Validation
  // TODO: add any validation logic here

  // STEP 2: Create the data that the carrier's API expects
  let data = {
    operation: "quote_rates",
    session_id: transaction.session.id,
    service_codes: criteria.deliveryServices.map(({id}) => idToCode(id)),
    confirmation_codes: criteria.deliveryConfirmations.map(({id}) => idToCode(id)),
    parcel_codes: criteria.packaging.map(({id}) => idToCode(id)),
    ship_date: criteria.shipDateTime.toISOString(),
    delivery_date: criteria.deliveryDateTime.toISOString(),
    from_zip: criteria.shipFrom.postalCode,
    to_zip: criteria.shipTo.postalCode,
    total_weight: criteria.packages.reduce((w, pkg) => w + pkg.weight.ounces, 0),
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return {
    rates: response.data.map(formatRate)
  };
}

/**
 * Formats a rate quote in the way ShipEngine expects
 */
function formatRate(rate) {
  return {
    deliveryServiceID: codeToID(rate.service_code),
    deliveryConfirmationID: codeToID(rate.confirmation_code),
    packagingID: codeToID(rate.parcel_code),
    shipDateTime: new Date(rate.ship_date),
    deliveryDateTime: new Date(rate.delivery_date),
    maximumDays: rate.delivery_days,
    isGuaranteed: rate.service_code !== "ECO",
    isTrackable: rate.service_code !== "ECO",
    charges: [
      {
        name: "Service Charge",
        type: "shipping",
        code: "SC1",
        amount: {
          value: rate.shipment_cost,
          currency: "USD"
        }
      },
      {
        name: "Confirmation Fee",
        type: "delivery_confirmation",
        code: "CONF",
        amount: {
          value: rate.confirmation_cost,
          currency: "USD"
        }
      },
      {
        name: "Transport Tax",
        type: "tax",
        code: "TX7",
        amount: {
          value: rate.tax_cost,
          currency: "USD"
        }
      },
    ],
  };
}

module.exports = getRates;
