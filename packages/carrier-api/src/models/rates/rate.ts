import { BillingLineItem } from "../billing/billing-line-item";
import { Currency } from "../currency";

/** @description Basic structure for a rate */
export interface Rate {
  service_code?: string;
  /** @description ISO 8601 formatted date for shipment */
  ship_datetime?: string;
  /** @description ISO 8601 formatted estimated delivery date */
  estimated_delivery_datetime?: string;
  /** @description List of charge details for a rate */
  billing_line_items?: BillingLineItem[];
  shipping_amount?: Currency;
  /** @description Charges for carrier insurance */
  insurance_amount?: Currency;
  /** @description Charges for delivery confirmation, e.g. signature */
  confirmation_amount?: Currency;
  /** @description Charges that are not related to shipping, insurance, or confirmation */
  other_amount?: Currency;
  /** @description Any error messages that resulted while trying to get the rate */
  error_messages?: string[];
  /** @description Any warning messages that resulted while trying to get the rate */
  warning_messages?: string[];
  /** @description Is the rate pre-negotiated? */
  negotiated_rate?: boolean;
}
