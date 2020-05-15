"use strict";

const apiClient = require("./mock-api/client");
const { idToCode, codeToID } = require("./id-code-map");

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
    service_codes: shipment.deliveryServices.map(({id}) => idToCode(id)),
    confirmation_codes: shipment.packages.reduce((codes, pkg) =>
      codes.concat(pkg.deliveryConfirmations.map(({id}) => idToCode(id))), []),
    parcel_codes: shipment.packages.reduce((codes, pkg) =>
      codes.concat(pkg.packaging.map(({id}) => idToCode(id))), []),
    ship_date: shipment.shipDateTime.toISOString(),
    delivery_date: shipment.deliveryDateTime.toISOString(),
    from_zone: parseInt(shipment.shipFrom.postalCode, 10),
    to_zone: parseInt(shipment.shipTo.postalCode, 10),
    total_weight: shipment.packages.reduce((w, pkg) => w + pkg.weight.ounces, 0),
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
    deliveryServiceID: codeToID(rate.service_code),
    shipDateTime: new Date(rate.ship_date),
    deliveryDateTime: new Date(rate.delivery_date),
    maximumDeliveryDays: rate.delivery_days,
    isGuaranteed: rate.service_code !== "ECO",
    isTrackable: rate.service_code !== "ECO",
    packages: [
      {
        packagingID: codeToID(rate.parcel_code),
        deliveryConfirmationID: codeToID(rate.confirmation_code),
      }
    ],
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

module.exports = rateShipment;
