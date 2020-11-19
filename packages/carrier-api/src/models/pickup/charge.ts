import { Currency } from '../currency';

export interface Charge {
  charge_tax: Currency;
  charge_amount: Currency;
  charge_code: string;
  charge_description: string;
  disclaimer: string;
}
