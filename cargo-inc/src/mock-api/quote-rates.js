"use strict";

const allServices = {
  "ECO": { price: .27, days: 5 },
  "STD": { price: .60, days: 3 },
  "ON": { price: 1.40, days: 1 },
};

const allConfirmations = {
  "SIG": { price: 1.25 },
  "SIG-A": { price: 2.5 },
  "SIG-R": { price: 2.99 },
};


/**
 * This is a mock implementation of a carrier's API that returns rate quotes for a shipment
 */
function quoteRates(request) {
  let services = request.service_code ? [request.service_code] : Object.keys(allServices);
  let confirmations = request.confirmation_code ? [request.confirmation_code] : Object.keys(allConfirmations);
  let packaging = request.parcel_code ? [request.parcel_code] : ["PAK", "PAL"];
  let totalWeight = request.total_weight;
  let shipDate = new Date(request.ship_date);
  let rates = [];

  for (let service_code of services) {
    for (let confirmation_code of confirmations) {
      for (let parcel_code of packaging) {
        let service = allServices[service_code];
        let confirmation = allConfirmations[confirmation_code];

        rates.push({
          service_code,
          confirmation_code,
          parcel_code,
          ship_date: shipDate.toISOString(),
          delivery_date: new Date(shipDate.setDate(shipDate.getDate() + service.days)).toISOString(),
          delivery_days: service.days,
          shipment_cost: service.price * totalWeight,
          confirmation_cost: confirmation.price,
          tax_cost: service.price * totalWeight * 0.08,
        });
      }
    }
  }

  return rates;
}

module.exports = quoteRates;
