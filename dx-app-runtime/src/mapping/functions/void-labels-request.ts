import { ShipmentCancellationPOJO } from '@shipengine/integration-platform-sdk';
import { VoidLabelsRequest, VoidRequest } from '@ipaas/capi/requests';

const mapVoidLabelRequest = (
  request: VoidRequest,
  metadata: any
): ShipmentCancellationPOJO => {
  return {
    cancellationID: request.void_request_id,
    trackingNumber: request.tracking_number
      ? request.tracking_number
      : undefined,
    identifiers: {
      carrierTransactionId: request.carrier_transaction_id
        ? request.carrier_transaction_id
        : undefined,
    },
    metadata: {
      ...metadata,
    },
  };
};

export const mapVoidLabelsRequestToCancelShipmentsPOJO = (
  request: VoidLabelsRequest
): ShipmentCancellationPOJO[] => {
  const shipmentCancellations: ShipmentCancellationPOJO[] = [];
  request.void_requests.forEach((voidRequest) => {
    if (voidRequest) {
      shipmentCancellations.push(
        mapVoidLabelRequest(voidRequest, request.metadata)
      );
    }
  });
  return shipmentCancellations;
};
