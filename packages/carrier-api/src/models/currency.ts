/**
* The user specified declared customs value of this customs item. This value may be zero.
*/
export interface Currency {
  /**
   * The amount of this value. Represented as a string to avoid floating point rounding
   * issues. You must parse this string into a type appropriate for financial and monetary
   * calculations.
   */
  amount: string;
  /**
   * The currency of this value. Will be a three letter currency code defined by
   * https://www.iban.com/currency-codes.html.
   */
  currency?: null | string;
}
