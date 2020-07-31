"use strict";

const apiClient = require("./mock-api/client");
const box = require("./packaging/box");

/**
 * Generates a shipping label and tracking number for a shipment
 */
async function createShipment(transaction, shipment) {
  // STEP 1: Validation
  for (let parcel of shipment.packages) {
    if (parcel.packaging.id === box.id && parcel.weight.grams > 100000) {
      throw new Error(`${parcel.packaging.name} cannot weigh more than 100 kilograms`);
    }
  }

  // STEP 2: Create the data that the carrier's API expects
  let data = {
    operation: "generate_label",
    session_id: transaction.session.id,
    service_code: shipment.deliveryService.identifiers.apiCode,
    confirmation_code: shipment.package.deliveryConfirmation.identifiers.apiCode,
    ship_date: shipment.shipDateTime,
    from_zone: parseInt(shipment.shipFrom.postalCode, 10),
    to_zone: parseInt(shipment.shipTo.postalCode, 10),
    total_weight: shipment.package.weight.ounces,
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return formatShipment(response.data);
}

/**
 * Formats a shipment in the way ShipEngine expects
 */
function formatShipment(response) {
  return {
    trackingNumber: response.tracking_number,
    deliveryDateTime: response.delivery_date,
    charges: [
      {
        type: "shipping",
        amount: {
          value: response.shipment_cost,
          currency: "USD"
        }
      },
      {
        type: "delivery_confirmation",
        amount: {
          value: response.confirmation_cost,
          currency: "USD"
        }
      },
      {
        type: "location_fee",
        amount: {
          value: response.location_cost,
          currency: "USD"
        }
      },
    ],
    documents: [
      {
        name: "Label",
        type: "label",
        size: "4x8",
        format: "pdf",
        data: Buffer.from(response.image, "base64"),
      }
    ],
    packages: [{
      trackingNumber: response.tracking_number
    }],
  };
}

module.exports = createShipment;
