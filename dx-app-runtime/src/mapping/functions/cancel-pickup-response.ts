import {
  PickupCancellationOutcomePOJO,
  CancellationStatus,
  TransactionPOJO,
} from "@shipengine/integration-platform-sdk";
import { CancelPickupResponse } from "@ipaas/capi/responses";

export const mapPickupCancellationOutcomePOJOToCancelPickupResponse = (
  response: PickupCancellationOutcomePOJO,
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
