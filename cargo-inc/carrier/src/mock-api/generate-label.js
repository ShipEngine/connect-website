"use strict";

/**
 * This is a mock implementation of a carrier's API that generates a label for a shipment
 */
function generateLabel(request) {
  let shipDate = new Date(request.ship_date);
  let weight = request.total_weight;
  let zone = request.to_zone;

  return {
    tracking_number: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
    delivery_date: new Date(shipDate.setDate(shipDate.getDate() + 4)).toISOString(),
    shipment_cost: .97 * weight,
    confirmation_cost: 1.26,
    location_cost: .000012 * zone,
    image_url: "https://httpbin.org/html",
  }
}

module.exports = generateLabel;
