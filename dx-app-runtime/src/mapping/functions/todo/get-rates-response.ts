import { GetRatesResponse } from "../capi/get-rates-response";
import { RateQuoteConfig } from "@shipengine/ipaas";
import mapRate from './rate';

export default (rateQuotes: RateQuoteConfig): GetRatesResponse => {
  const rateResponse: GetRatesResponse = {
    rates: rateQuotes.rates.map(mapRate)
  };
  return rateResponse;
}
