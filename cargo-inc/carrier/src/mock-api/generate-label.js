"use strict";

/**
 * This is a mock implementation of a carrier's API that generates a label for a shipment
 */
function generateLabel(request) {
  let shipDate = new Date(request.ship_date);

  return {
    tracking_number: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
    delivery_date: new Date(shipDate.setDate(shipDate.getDate() + 4)).toISOString(),
    shipment_cost: 5.97,
    confirmation_cost: 1.26,
    other_cost: 0,
    image_url: "https://httpbin.org/html",
  }
}

module.exports = generateLabel;
