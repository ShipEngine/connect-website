  "use strict";


import { apiClient } from "../mock-api/client";
import { VoidLabelsResponse, VoidLabelsRequest } from "../mock-api/void-labels";
import { ShipmentCancellation, ShipmentCancellationOutcome, Transaction } from "@shipengine/connect";
import { Session } from "./session";

export default async function cancelShipments(
  transaction: Transaction<Session>, shipmentCancellations: ShipmentCancellation[]): Promise<ShipmentCancellationOutcome[]> {
  // STEP 1: Validation

  // STEP 2: Create the data that the carrier's API expects
  let data: VoidLabelsRequest = {
    operation: "void_labels",
    session_id: transaction.session.id,
    cancellations: shipmentCancellations.map((cancellation) => {
      const { cancellationID, trackingNumber } = cancellation;
      return {
        cancellationID: cancellationID,
        internalReferenceID: cancellation.identifiers.internalReferenceID,
        trackingNumber: trackingNumber,
      };
    }),
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request<VoidLabelsResponse>({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return await formatCancellationResponse(response.data);
}

/**
 * Formats a shipment in the way ShipEngine expects
 */
async function formatCancellationResponse(response) {
  return response.canceledShipments.map((cancellation) => {
    const status = ((status) => {
      switch (status) {
        case "COMPLETE":
          return "success";
        case "FAILED":
          return "error";
        default:
          throw new Error("status unknown");
      }
    })(cancellation.cancellationStatus);

    return {
      cancellationID: cancellation.id,
      status: status,
      code: cancellation.cancellationCode,
      description: cancellation.cancellationDescription,
      notes: cancellation.cancellationNote ? [{ type: "message_to_buyer", text: cancellation.cancellationNote }] : undefined,
      metadata: {},
    };
  });
}
