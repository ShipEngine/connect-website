import {
  CancelPickupRequest,
  SchedulePickupRequest,
  TrackingRequest,
  VoidLabelsRequest,
  GetRatesRequest,
  RegisterRequest,
  CreateLabelRequest,
} from "@shipengine/connect-carrier-api/lib/requests";
import { Transaction } from "@shipengine/connect-sdk";

export interface HeaderArgs {
  language: string;
}

export const mapTransaction = (
  request:
    | RegisterRequest
    | GetRatesRequest
    | CreateLabelRequest
    | VoidLabelsRequest
    | TrackingRequest
    | SchedulePickupRequest
    | CancelPickupRequest,
  header: HeaderArgs
): Transaction => {
  return {
    id: request.transaction_id || "",
    language: header.language,
    session: {
      ...request.metadata,
    },
  };
};
