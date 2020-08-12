import {
  Transaction,
} from '@shipengine/integration-platform-sdk';
import {
  ShipmentCancellationOutcome,
} from '@shipengine/integration-platform-sdk/lib/internal';
import { VoidLabelsResponse, VoidResponse } from '@ipaas/capi/responses';

export const mapVoidLabelsResponse = (
  response: ShipmentCancellationOutcome[],
  transaction: Transaction
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
