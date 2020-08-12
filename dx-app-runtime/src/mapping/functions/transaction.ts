import {
  CancelPickupRequest,
  SchedulePickupRequest,
  TrackRequest,
  VoidLabelsRequest,
  GetRatesRequest,
  RegisterRequest,
  CreateLabelRequest,
} from '@ipaas/capi/requests';
import { Transaction } from '@shipengine/integration-platform-sdk';

export const mapTransaction = (
  request:
    | RegisterRequest
    | GetRatesRequest
    | CreateLabelRequest
    | VoidLabelsRequest
    | TrackRequest
    | SchedulePickupRequest
    | CancelPickupRequest
): Transaction => {
  return {
    id: request.transaction_id || '',
    useSandbox: false, // TODO: Do we want to add sandbox to call?
    session: {
      ...request.metadata,
    },
  };
};
