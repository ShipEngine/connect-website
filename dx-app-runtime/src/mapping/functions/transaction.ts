import { CancelPickupRequest, SchedulePickupRequest, TrackRequest, VoidLabelsRequest, GetRatesRequest, RegisterRequest, CreateLabelRequest } from "@ipaas/capi/requests";
import { TransactionPOJO } from "@shipengine/integration-platform-sdk"
import { BasicAuth } from "../../basic-auth";


export default (request: RegisterRequest | GetRatesRequest | CreateLabelRequest | VoidLabelsRequest | TrackRequest | SchedulePickupRequest | CancelPickupRequest, auth: BasicAuth | null | undefined): TransactionPOJO => {
  const transaction = {
    id: request.transaction_id || '',
    session: {
      ...request.metadata,
      ...auth
    }
  };
  return transaction;
}
