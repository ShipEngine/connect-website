import { CancelPickupRequest,SchedulePickupRequest, TrackRequest, VoidLabelsRequest, GetRatesRequest, RegisterRequest, CreateLabelRequest } from "@ipaas/capi/requests";
import  {TransactionPOJO} from "@shipengine/integration-platform-sdk"


const capiRequestToDxTransaction = (request: RegisterRequest | GetRatesRequest | CreateLabelRequest | VoidLabelsRequest | TrackRequest | SchedulePickupRequest | CancelPickupRequest): TransactionPOJO => {
  const transaction  = {
    id: request.transaction_id || '',
    session: {
      ...request.metadata,
    }
  };
  return transaction;
}

export {capiRequestToDxTransaction};
