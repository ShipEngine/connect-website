"use strict";

/**
 * This is a mock implementation of a carrier's API that generates a label for a shipment
 */
function generateEOD(request) {
  let shipDate = new Date(request.ship_date);
  let weight = request.total_weight;

  return {
    data: [
      {
        tracking_number: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
      },
      {
      tracking_number: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
      }],
  }
}

module.exports = generateEOD;

