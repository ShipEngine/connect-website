"use strict";

const data = [
  {
    status: "COMPLETE",
    code: "AC",
    description: "Cancelation is complete.",
    notes: ""
  },
  {
    status: "FAILED",
    code: "FA",
    description: "Cancelation failed.",
    notes: "Please call ###-###-### to cancel."
  }
]

/**
 * This is a mock implementation of a carrier"s API that cancels a shipment.
 */
function cancelShipments(request) {
  return {
    canceledShipments: request.cancelations.map((cancelation) => {
      const { cancelationID } = cancelation;
      const { status, code, description, notes } = data[Math.floor(Math.random() * data.length)];

      return {
        id: cancelationID,
        cancelationStatus: status,
        cancelationCode: code,
        cancelationDescription: description,
        cancelationNotes: notes,
        cancelationConfirmation: Buffer.from(new Date().toISOString()).toString("base64"),
      }
    })
  }
}

module.exports = cancelShipments;
