"use strict";

const apiClient = require("./mock-api/client");
const deliveryServices = require("./delivery-services");
const packaging = require("./packaging");
const deliveryConfirmations = require("./delivery-confirmations");

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
    service_codes: shipment.deliveryServices.map((svc) => svc.identifiers.apiCode),
    confirmation_codes: shipment.package.deliveryConfirmations.map((conf) => conf.identifiers.apiCode),
    parcel_codes: shipment.package.packaging.map((pkg) => pkg.identifiers.apiCode),
    ship_date: shipment.shipDateTime.toISOString(),
    delivery_date: shipment.deliveryDateTime.toISOString(),
    from_zone: parseInt(shipment.shipFrom.postalCode, 10),
    to_zone: parseInt(shipment.shipTo.postalCode, 10),
    total_weight: shipment.package.weight.ounces,
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
    deliveryService: deliveryServices.find((svc) => svc.identifiers.apiCode === rate.service_code),
    shipDateTime: new Date(rate.ship_date),
    deliveryDateTime: new Date(rate.delivery_date),
    maximumDeliveryDays: rate.delivery_days,
    isGuaranteed: true,
    isTrackable: true,
    packages: [{
      packaging: packaging.find((pkg) => pkg.identifiers.apiCode === rate.parcel_code),
      deliveryConfirmation: deliveryConfirmations.find((conf) => conf.identifiers.apiCode === rate.confirmation_code),
    }],
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
