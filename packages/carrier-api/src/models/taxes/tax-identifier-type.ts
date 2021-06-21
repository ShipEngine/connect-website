/** @description Specifies the supported tax identification types  */
export enum TaxIdentifierType {
  /** @description Tax Identification Number  */
  TIN = "tin",
  /** @description Employer Identification Number  */
  EIN = "ein",
  /** @description Social Security Number  */
  SSN = "ssn",
  /** @description Value Added Tax Identification Number  */
  VAT = "vat",
  /** @description Economic Operators Registration and Identification Number  */
  EORI = "eori",
  /** @description Import One-Stop Shop Number
   * The IOSS allows suppliers and electronic interfaces selling imported goods to buyers in the EU to
   * collect, declare and pay the VAT to the tax authorities, instead of making the buyer pay the VAT at the
   * moment the goods are imported into the EU as it was previously the case (for products over 22 EUR).
   * https://ec.europa.eu/taxation_customs/business/vat/ioss_en
   */
  IOSS = "ioss",
  /** @description Permanent Account Number
   * A ten-character alphanumeric identifier, issued by the Indian Income Tax
   */
  PAN = "pan",
  /** @description Norway's VAT on E-Commerce number
   * https://www.skatteetaten.no/en/business-and-organisation/vat-and-duties/vat/foreign/e-commerce-voec/
   */
  VOEC = "voec",
}
