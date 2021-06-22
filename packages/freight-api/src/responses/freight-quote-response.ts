import { Quote } from '../models/quote';
import { BaseCarrierResponse } from './base-carrier-response';

export interface FreightQuoteResponse extends BaseCarrierResponse, Quote {
  service_level: {
    code: string;
    carrier_description?: string;
  };
}
