import { Quote } from "../models/quote";
import { BaseCarrierResponse } from "./base-carrier-response";

interface SpotQuote extends Quote {
  /**
   * Spot/volume service level returned by the carrier. These service levels are often different than standard service levels so only the description provided by the carrier is returned.
   */
  service_level?: {
    carrier_description?: string;
  };
}

export interface FreightSpotQuoteResponse extends BaseCarrierResponse {
  results: SpotQuote[];
}
