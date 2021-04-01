import { RequestBase } from "./request-base";
import { Address, Note } from "../models";

/** @description  */
export interface ShipmentNotificationItem {
  /** @description The order source's unique identifier for the line item */
  line_item_id?: string;
  /** @description A description of the sales order item - which may differ from the product description */
  description: string;
  /** @description The unique identifier for the item that was shipped */
  sku?: string;
  /** @description This ID of this product in the vendor API */
  product_id?: string;
  /** @description The number of items of this SKU that were shipped */
  quantity: number;
}

/** @description An individual notification that an order has been shipped */
export interface ShipmentNotification {
  /** @description A unique identifier to correlate this shipment notification with its result in the response */
  notification_id: string;
  /** @description The unique identifier of the sales order from the order source */
  order_id: string;
  /** @description The customer facing identifier of the sales order */
  order_number?: string;
  /** @description The identifier provided by the fulfiller for tracking the delivery progress */
  tracking_number?: string;
  /** @description The url where the shipment can be tracked */
  tracking_url?: string;
  /** @description The carrier code the order was shipped through */
  carrier_code?: string;
  /** @description The shipping service used to ship this order */
  carrier_service_code?: string;
  /** @description The order source's identifier for the location that items were shipped from */
  ext_location_id?: string;
  /** @description The items shipped in this shipment */
  items: ShipmentNotificationItem[];
  /** @description Where the shipment was shipped to */
  ship_to?: Address;
  /** @description Where the shipment shipped from */
  ship_from?: Address;
  /** @description The return address specified on the shipment */
  return_address?: Address;
  /** @description The (ISO 8601) datetime (UTC) associated with when this item was last modified @example "2021-03-31T18:21:14.858Z" */
  ship_date?: string;
  /** @description The (ISO 4217) code describing the currency used for all amounts on this payload. @example "USD", "EUR", "NZD" */
  currency?: string;
  /** @description The amount of money it cost to fulfill this shipment */
  fulfillment_cost?: number;
  /** @description Additional notes associated with this notification or its sales order */
  notes?: Note[];
  /** @description The total amount of insurance purchased */
  insurance_cost?: number;
  /** @description Indicates whether or not the buyer should be notified that this item has been shipped */
  notify_buyer?: boolean;
  /** @description The integration context specified on the ExportSalesOrders response */
  integration_context: any;
}

/** @description A request to notify an order source that a order has been shipped */
export interface ShipmentNotificationRequest extends RequestBase {
  /** @description A list of orders to notify the order source about */
  notifications: ShipmentNotification[];
}
