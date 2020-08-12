import {
  CancellationStatus,
} from '@shipengine/integration-platform-sdk';
import {
  PickupCancellationOutcome,
} from '@shipengine/integration-platform-sdk/lib/internal';
import {
  TransactionPOJO,
} from '@shipengine/integration-platform-sdk/lib/internal';

import { CancelPickupResponse } from '@ipaas/capi/responses';

export const mapCancelPickupResponse = (
  response: PickupCancellationOutcome,
  transaction: TransactionPOJO
): CancelPickupResponse => {
  return {
    confirmation_id: response.confirmationNumber,
    successful: response.status === CancellationStatus.Success,
    status: response.notes?.toString(),
    custom_properties: {
      // TODO: Figure out what to map here
    },
    metadata: {
      ...transaction.session,
    },
  };
};
