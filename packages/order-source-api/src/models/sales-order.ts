import { Address } from "./address";
import { ShippingPreferences } from "./shipping-preferences";
import { SalesOrderItem } from "./sales-order-item";
import { Buyer } from "./buyer";
import { BillTo } from "./bill-to";
import { Payment } from "./payment";
import { Note } from "./note";

export enum SalesOrderStatus {
  AwaitingPayment = "AwaitingPayment",
  AwaitingShipment = "AwaitingShipment",
  Cancelled = "Cancelled",
  Completed = "Completed",
  OnHold = "OnHold",
  PendingFulfillment = "PendingFulfillment",
}

export interface OriginalOrderSource {
  source_id?: string;
  marketplace_code?: string;
  order_id?: string;
}

export interface RequestedFulfillmentExtensions {
  custom_field_1?: string;
  custom_field_2?: string;
  custom_field_3?: string;
}

export interface RequestedFulfillment {
  ship_to: Address;
  items: SalesOrderItem[];
  extensions?: RequestedFulfillmentExtensions;
  shipping_preferences?: ShippingPreferences;
}

export interface SalesOrder {
  order_id: string;
  order_number?: string;
  status: SalesOrderStatus;
  paid_date?: string;
  fulfilled_date?: string;
  original_order_source?: OriginalOrderSource;
  requested_fulfillments?: RequestedFulfillment[];
  buyer?: Buyer;
  bill_to?: BillTo;
  currency?: string;
  payment?: Payment;
  ship_from?: Address;
  order_url?: string;
  notes?: Note[];
  integration_context?: string;
  created_date_time?: string;
  modified_date_time?: string;
}
