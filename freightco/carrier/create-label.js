"use strict";

const apiClient = require("./mock-api/client");
const { idToCode } = require("./id-code-map");
const box = require("./packaging/box");

/**
 * Requests a shipping label for a shipment
 */
async function createLabel(transaction, { format, size, shipment }) {
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
    label_type: format,
    label_size: size,
    service_code: idToCode(shipment.deliveryService.id),
    confirmation_code: idToCode(shipment.deliveryConfirmation.id),
    ship_date: shipment.shipDateTime.toISOString(),
    from_zone: parseInt(shipment.shipFrom.postalCode, 10),
    to_zone: parseInt(shipment.shipTo.postalCode, 10),
    total_weight: shipment.packages.reduce((w, pkg) => w + pkg.weight.ounces, 0),
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return formatLabel(response.data);
}

/**
 * Formats a label in the way ShipEngine expects
 */
function formatLabel(label) {
  return {
    charges: [
      {
        type: "shipping",
        amount: {
          value: label.shipment_cost,
          currency: "USD"
        }
      },
      {
        type: "delivery_confirmation",
        amount: {
          value: label.confirmation_cost,
          currency: "USD"
        }
      },
      {
        type: "location_fee",
        amount: {
          value: label.location_cost,
          currency: "USD"
        }
      },
    ],
    shipment: {
      trackingNumber: label.tracking_number,
      deliveryDateTime: label.delivery_date,
      packages: [{
        trackingNumber: label.tracking_number,
        label: {
          name: "Label",
          size: "4x8",
          format: "pdf",
          data: Buffer.from(label.image, "base64"),
        }
      }],
    },
  };
}

module.exports = createLabel;
