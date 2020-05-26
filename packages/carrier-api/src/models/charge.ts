import { Currency } from "./currency";

export interface Charge {
  /**
   * The amount being charged.
   */
  charge_amount?: Currency;
  /**
   * The shipping provider specific code for this charge.
   */
  charge_code?: null | string;
  /**
   * A human readable description about this charge.
   */
  charge_description?: null | string;
  /**
   * The tax associated with this charge.
   */
  charge_tax?: Currency;
  /**
   * An optional human readable disclaimer about this charge.
   */
  disclaimer?: null | string;
}
