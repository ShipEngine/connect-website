import { BillingLineItem } from "../billing/billing-line-item";
import { Currency } from "../currency";

export interface Rate {
  service_code?: string;
  ship_datetime?: string;
  estimated_delivery_datetime?: string;
  billing_line_items?: BillingLineItem[];
  shipping_amount?: Currency;
  insurance_amount?: Currency;
  confirmation_amount?: Currency;
  other_amount?: Currency;
  error_messages?: string[];
  warning_messages?: string[];
  negotiated_rate?: boolean;
}
