import { Currency } from "../currency";

/** @description Charge information */
export interface Charge {
  charge_tax: Currency;
  charge_amount: Currency;
  charge_code: string;
  charge_description: string;
  disclaimer: string;
}
