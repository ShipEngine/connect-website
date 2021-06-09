import { BaseQuoteRequest } from "./base-quote-request";

/**
 * Obtain a price quote for a freight shipment using contractual rates.
 */
export interface FreightQuoteRequest extends BaseQuoteRequest {
  service_level: {
    code: string;
  };
}
