/**
 * This is a mock implementation of a carrier's API that schedules a pick-up
 */

const DEFAULT_PICKUP_COST = 2;
const DEFAULT_TAX_COST = 1;

function pickUp(request) {
  let serviceCode = request.service_code;
  let dateTime = new Date(request.date_time.value);
  let weight = request.total_weight;

  switch (serviceCode) {
    case "SAMEDAY":
      dateTime = new Date(Date.now() + (ONE_HOUR * 4));
      break;
    case "NEXTDAY":
      dateTime = new Date(Date.now() + ONE_DAY);
      break;
    case "FLEXPIK":
      dateTime = new Date(Date.now() + (ONE_DAY * 2));
      break;
  }

  let returnValue = {
    id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
    date_time: dateTime.toISOString(),
    pickup_cost: .15 * weight || DEFAULT_PICKUP_COST,
    tax_cost: .03 * weight || DEFAULT_TAX_COST,
    location_cost: .000012 * Math.floor(Math.random() * (10)) + 1,
  }

  return returnValue;
}

module.exports = pickUp;