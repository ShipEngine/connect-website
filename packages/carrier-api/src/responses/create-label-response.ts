import { BaseResponse } from "./base-response";
import { BillingLineItem, Currency, LabelPackage } from "../models";

/** @description Basic structure for a response to create a label */
export interface CreateLabelResponse extends BaseResponse {
  transaction_id: string;
  billing_line_items?: BillingLineItem[];
  tracking_number?: string;
  trackable?: boolean;
  carrier_transaction_id?: string;
  estimated_delivery_datetime?: string;
  shipping_amount?: Currency;
  insurance_amount?: Currency;
  packages?: LabelPackage[];
}
