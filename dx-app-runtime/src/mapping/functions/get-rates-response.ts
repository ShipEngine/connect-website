import { GetRatesResponse } from "@ipaas/capi/responses";
import {
  RatePOJO,
  TransactionPOJO,
} from "@shipengine/integration-platform-sdk";
import mapRate from "./rate";

const mapRatePOJOToGetRatesResponse = (
  transaction: TransactionPOJO,
  rateQuotes: RatePOJO[]
): GetRatesResponse => {
  const rateResponse: GetRatesResponse = {
    rates: rateQuotes.map(mapRate),
    metadata: transaction.session,
  };
  return rateResponse;
};

export { mapRatePOJOToGetRatesResponse };
