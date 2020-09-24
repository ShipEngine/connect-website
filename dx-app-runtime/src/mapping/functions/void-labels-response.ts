import {
  Transaction,
} from '@shipengine/connect-sdk';
import {
  ShipmentCancellationOutcome,
} from '@shipengine/connect-sdk/lib/internal';
import { VoidLabelsResponse, VoidResponse } from '@ipaas/capi/responses';

export const mapVoidLabelsResponse = (
  response: ShipmentCancellationOutcome[],
  transaction: Transaction
): VoidLabelsResponse => {
  const voidResponses: VoidResponse[] = [];
  response.forEach((response) => {
    voidResponses.push({
      void_request_id: response.cancellationID,
      message: response.notes ? response.notes.map(p => p.text).join(', ') : '',
    });
  });
  return {
    void_responses: voidResponses,
    metadata: {
      ...transaction.session,
    },
  };
};
