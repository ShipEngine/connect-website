"use strict";

const allStatusCodes = ["NY", "C", "IT"]
const allStatuses = {
  NY: "NOT YET IN SYSTEM",
  C: "COMPLETE",
  IT: "IN TRANSIT"
}


/**
 * This is a mock implementation of a carrier"s API that cancels a shipment.
 */
function trackShipment(request) {
  const statusCode = allStatusCodes[Math.floor(Math.random * allStatuCodes.length)];
  const status = allStatuses[statusCode];

  return {
    deliveryDate: "2005-09-23T17:30:00 CST",
    packages: [
      {
        description: "Large square box",
        length: 4,
        width: 4,
        height: 4,
        dimUnit: "in",
        weight: 4,
        weightUnit: "lb"
      }
    ],
    trackingEvents: [
      {
        description: "Received at facility,",
        date: "2005-09-23T17:30:00 CST",
        status: status,
        errors: [],
        statusCode: statusCode,
        addressLine1: "4009 Marathon Blvd.",
        addressLine2: "",
        city: "Austin",
        state: "TX",
        zip: "78756",
        country: "USA",
        addressType: "residential",
        latitude: "30.308740",
        longitude: "-97.741750",
        companyName: "ShipEngine",
      }
    ],
    signedBy: {
      salutation: "Mr.",
      firstName: "Ship",
      middleName: "",
      lastName: "Engine",
      suffix: "",
    },
    notes: "This package was tracked successfully",
  }
}

module.exports = trackShipment;
