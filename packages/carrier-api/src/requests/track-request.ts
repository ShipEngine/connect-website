import { Identifier } from "../models";

export interface TrackRequest {
  attributes?: Array<null | Identifier> | null;
  /**
   * This array represents the custom identifiers for a carrier.
   */
  identifiers?: Array<null | Identifier> | null;
  /**
   * Whether this represents a return shipment. If the field is absent it should be interpeted
   * as false
   */
  is_return?: boolean | null;
  /**
   * This is an optional schemaless object that you may return with a successful response.
   * Anything returned under this key will be included in all future requests. For example,
   * you may store additional static properties about the end user or their connection to the
   * carrier. The maximum storage size for data under this key is 4KB.
   */
  metadata?: { [key: string]: any } | null;
  /**
   * This property is deprecated. Please use Identifiers instead where tracking_number will be
   * found as a type.
   */
  tracking_number?: null | string;
  /**
   * The transaction ID uniquely represents this request. If the request is retried then this
   * transaction ID will be the same. You should only perform the requested action once per
   * given transaction ID.
   */
  transaction_id?: null | string;
}
