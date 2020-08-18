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
    ship_date: shipment.shipDateTime.toISOString(),
    total_weight: shipment.package.weight.ounces,
  };

  if (shipment.deliveryService && shipment.deliveryService.code) {
    data.service_code = shipment.deliveryService.code;
  }

  if(shipment.deliveryConfirmation) {
    data.confirmation_code = shipment.deliveryConfirmation.code;
  }

  if (shipment.packages.length > 0) {
    data.parcel_codes = shipment.packages
      .map((packages) => packages.packaging && packages.packaging.code)
      .filter((packageCodes) => packageCodes !== undefined);
  }
  
  if(shipment.deliveryDateTime) {
    data.delivery_date = shipment.deliveryDateTime.toISOString();
  }

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
    deliveryService: deliveryServices.find((svc) => svc.code === rate.service_code),
    shipDateTime: new Date(rate.ship_date),
    deliveryDateTime: new Date(rate.delivery_date),
    isTrackable: true,
    deliveryConfirmation: deliveryConfirmations.find((conf) => conf.code === rate.confirmation_code),
    packages: [{
      packaging: packaging.find((pkg) => pkg.code === rate.parcel_code || pkg.id === rate.parcel_code),
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
