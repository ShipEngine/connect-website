"use strict";

const axios = require("axios");
const apiClient = require("../carrier/src/mock-api/client");

async function cancelShipments(transaction, shipmentCancellations){
    // STEP 1: Validation


    // STEP 2: Create the data that the carrier's API expects

    let data = {
        operation: "cancel_shipments",
        session_id: transaction.session.id,
        cancelations: shipmentCancelations.map( (cancelation) => {
            const { cancelationID, trackingNumber } = cancelation;
            return {
                cancelationID: cancelationID,
                internalReferenceID: cancelation.identifiers.internalReferenceID,
                trackingNumber: trackingNumber
            }
        })
    };

    // STEP 3: Call the carrier's API
    const response = await apiClient.request({ data });

    // STEP 4: Create the output data that ShipEngine expects
    return await formatCancellationResponse(response.data);

}

/**
 * Formats a shipment in the way ShipEngine expects
 */
async function formatCancellationResponse(response) {
    return response.shipmentCancelations.map((c) => {
        return {
            cancellationID: c.id,
            status: c.cancelationStatus,
            confirmation: c.cancelationConfirmation,
            code: c.cancelationCode,
            description: c.cancelationDescription,
            notes: c.cancelationNotes,
            metadata: {}
        }
    })
}

module.exports = cancelShipments;
