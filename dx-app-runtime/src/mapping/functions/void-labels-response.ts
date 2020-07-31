import {
  ShipmentCancellationOutcomePOJO,
  TransactionPOJO,
} from '@shipengine/integration-platform-sdk';
import { VoidLabelsResponse, VoidResponse } from '@ipaas/capi/responses';

export const mapShipmentCancellationOutcomeToVoidLabelsResponse = (
  response: ShipmentCancellationOutcomePOJO[],
  transaction: TransactionPOJO
): VoidLabelsResponse => {
  const voidResponses: VoidResponse[] = [];
  response.forEach((response) => {
    voidResponses.push({
      void_request_id: response.cancellationID,
      message: response.notes ? response.notes.toString() : '',
    });
  });
  return {
    void_responses: voidResponses,
    metadata: {
      ...transaction.session,
    },
  };
};
