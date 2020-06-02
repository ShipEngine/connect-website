import { GetRatesResponse } from "@ipaas/capi/responses";
import { RatePOJO } from "@shipengine/integration-platform-sdk";
import mapRate from './rate';

const mapRatePOJOToGetRatesResponse = (rateQuotes: RatePOJO[]): GetRatesResponse => {
  const rateResponse: GetRatesResponse = {
    rates: rateQuotes.map(mapRate)
  };
  return rateResponse;
}

export {
  mapRatePOJOToGetRatesResponse
}
