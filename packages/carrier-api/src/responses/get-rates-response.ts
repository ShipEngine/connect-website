import { 
  Currency
} from "../models";
import { BaseResponse } from "./base-response";

export interface GetRatesResponse extends BaseResponse {
  /**
   * A list of rates for shipping services. If you use service codes there may be exactly one
   * rate returned for the requested service. If you use service codes there may be more than
   * one rate to provide additional options. If you don't use service codes there may be one
   * or more rates. If you don't provide real time rates you should return a single hard coded
   * zero value rate.
   */
  rates: Rate[];
}

/**
* This model represents a rate for a given service code.
*/
export interface Rate {
  /**
   * The confirmation cost of the package(s) in this request.
   */
  confirmation_amount?: Currency;
  /**
   * A list of discrete errors.
   */
  error_messages?: string[] | null;
  /**
   * When the package(s) in this shipment are expected to arrive at their destination.
   * Formatted per https://tools.ietf.org/html/rfc3339. Must be in UTC.
   */
  estimated_delivery_datetime?: null | string;
  /**
   * The total cost to insure the package(s) in this request.
   */
  insurance_amount?: Currency;
  /**
   * Whether these are negotiated rates.
   */
  negotiated_rate?: boolean | null;
  /**
   * The total additional costs of the package(s) in this request. This is a generic bucket
   * for charges that don't fit into the other categories.
   */
  other_amount?: Currency;
  /**
   * The service code uniquely identifies a shipping service that you offer. Which service
   * codes can be passed to you will be configured in ShipEngine. If you don't use service
   * codes this field won't be present.
   */
  service_code?: null | string;
  /**
   * When the package is expected to ship. Not guaranteed to be in the future. Formatted per
   * the https://tools.ietf.org/html/rfc3339 spec. Must be in UTC.
   */
  ship_datetime?: null | string;
  /**
   * The total cost to ship the package(s) in this request.
   */
  shipping_amount?: Currency;
  /**
   * A list of discrete warnings. This should be data the end user needs to be aware of. These
   * should not stop the request from succeeding.
   */
  warning_messages?: string[] | null;
}
