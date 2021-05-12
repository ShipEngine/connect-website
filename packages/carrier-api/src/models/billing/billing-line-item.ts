import { BillingCategories } from "./billing-categories";
import { Currency } from "../currency";

/** @description Basic structure of each charge or line item */
export interface BillingLineItem {
  billing_category: BillingCategories;
  carrier_description?: string;
  carrier_billing_code?: string;
  memo?: string;
  amount: Currency;
}
