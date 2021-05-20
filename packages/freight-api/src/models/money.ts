export interface Money {
  /**
   * The amount of this value. Represented as a string to avoid floating point rounding issues. You must parse this string into a type appropriate for financial and monetary calculations.
   */
  value: string;
  /**
   * The currency of this value. Will be a three letter currency code defined by https://www.iban.com/currency-codes.html.
   */
  currency: string;
}
