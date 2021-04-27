import { Address } from "./address";
import { ShippingPreferences } from "./shipping-preferences";
import { SalesOrderItem } from "./sales-order-item";
import { Buyer } from "./buyer";
import { BillTo } from "./bill-to";
import { Payment } from "./payment";
import { Note } from "./note";
import { Branding } from "./branding";

/** @description The status of a sales order */
export enum SalesOrderStatus {
  AwaitingPayment = "AwaitingPayment",
  AwaitingShipment = "AwaitingShipment",
  Cancelled = "Cancelled",
  Completed = "Completed",
  OnHold = "OnHold",
  PendingFulfillment = "PendingFulfillment",
}

/** @description Represents information from the source marketplace. (This is common with reselling goods) */
export interface OriginalOrderSource {
  /** @description A unique identifier for the source marketplace */
  source_id?: string;
  /** @description The code for the type of marketplace */
  marketplace_code?: string;
  /** @description The unique identifier for the order at the source marketplace */
  order_id?: string;
}

/** @description Additional information necessary for a requested fulfillment */
export interface RequestedFulfillmentExtensions {
  /** @description Custom field 1 */
  custom_field_1?: string;
  /** @description Custom field 2 */
  custom_field_2?: string;
  /** @description Custom field 3 */
  custom_field_3?: string;
}

/** @description The fulfillment requested by the marketplace or the buyer */
export interface RequestedFulfillment {
  /** @description Who the order should be shipped to */
  ship_to: Address;
  /** @description The items that should be shipped */
  items: SalesOrderItem[];
  /** @description Additional information about this fulfillment */
  extensions?: RequestedFulfillmentExtensions;
  /** @description Preferences about how the order is shipped */
  shipping_preferences?: ShippingPreferences;
  /** @description Brand information about this fulfillment */
  branding?: Branding;
}

/** @description This represents a sales order */
export interface SalesOrder {
  /** @description The unique identifier of the sales order from the order source */
  order_id: string;
  /** @description The customer facing identifier of the sales order */
  order_number?: string;
  /** @description The sales order status */
  status: SalesOrderStatus;
  /** @description The (ISO 8601) datetime (UTC) associated with when this sales order was paid for @example "2021-03-31T18:21:14.858Z" */
  paid_date?: string;
  /** @description The (ISO 8601) datetime (UTC) associated with when this order shipped @example "2021-03-31T18:21:14.858Z" */
  fulfilled_date?: string;
  /** @description Represents information from the source marketplace. (This is common with reselling goods) */
  original_order_source?: OriginalOrderSource;
  /** @description The fulfillment requested by the marketplace or the buyer */
  requested_fulfillments?: RequestedFulfillment[];
  /** @description The buyer of this sales order */
  buyer?: Buyer;
  /** @description The person being billed for this sales order */
  bill_to?: BillTo;
  /** @description The three character ISO 4217 code of the currency used for all monetary amounts @example "USD", "EUR", "NZD" */
  currency?: string;
  /** @description Information about the payment */
  payment?: Payment;
  /** @description The source that the order is shipping from */
  ship_from?: Address;
  /** @description A unique url associated with the order */
  order_url?: string;
  /** @description Notes about the order */
  notes?: Note[];
  /** @description Data provided by the order source that should be included in calls back to the order source. This data is only meaningful to the integration and not otherwise used by the platform. */
  integration_context?: string;
  /** @description The (ISO 8601) datetime (UTC) associated with when this order was created @example "2021-03-31T18:21:14.858Z" */
  created_date_time?: string;
  /** @description The (ISO 8601) datetime (UTC) associated with when this order was last modified @example "2021-03-31T18:21:14.858Z" */
  modified_date_time?: string;
}
