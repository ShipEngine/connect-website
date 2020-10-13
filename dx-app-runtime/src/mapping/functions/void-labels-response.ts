import {
  CancellationStatus,
  Transaction,
} from '@shipengine/connect-sdk';
import {
  ShipmentCancellationOutcome,
} from '@shipengine/connect-sdk/lib/internal';
import { VoidLabelsResponse, VoidResponse } from '@ipaas/capi/responses';

export const mapVoidLabelsResponse = (
  responses: ShipmentCancellationOutcome[],
  transaction: Transaction
): VoidLabelsResponse => {
  const voidResponses: VoidResponse[] = [];
  responses.forEach((response) => {
    voidResponses.push({
      void_request_id: response.cancellationID,
      errors: response.status !== CancellationStatus.Success ? [response.description || 'Error'] : undefined,
      message: response.description,
    });
  });
  return {
    void_responses: voidResponses,
    metadata: {
      ...transaction.session,
    },
  };
};
