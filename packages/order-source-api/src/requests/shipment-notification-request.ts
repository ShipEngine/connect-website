import { RequestBase } from "./request-base";
import { Address, Note } from "../models";

export interface ShipmentNotificationItem {
  line_item_id?: string;
  description: string;
  sku?: string;
  product_id?: string;
  quantity: number;
}

export interface ShipmentNotification {
  notification_id: string;
  order_id: string;
  order_number?: string;
  tracking_number?: string;
  tracking_url?: string;
  carrier_code?: string;
  carrier_service_code?: string;
  ext_location_id?: string;
  items: ShipmentNotificationItem[];
  ship_to?: Address;
  ship_from?: Address;
  return_address?: Address;
  ship_date?: string;
  /** The three character ISO 4217 code of the currency used for all monetary amounts */
  currency?: string;
  fulfillment_cost?: number;
  /** Additional notes associated with this notification or its sales order */
  notes?: Note[];
  insurance_cost?: number;
  notify_buyer?: boolean;
  integration_context: any;
}

export interface ShipmentNotificationRequest extends RequestBase {
  notifications: ShipmentNotification[];
}
