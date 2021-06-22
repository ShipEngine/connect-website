/**
 * The types of ShipEngine Connect apps
 */
export enum AppType {
  Carrier = 'carrier',
  Freight = 'freight',
  Order = 'order',
}

/**
 * The status of a cancellation request
 */
export enum CancellationStatus {
  Success = 'success',
  Error = 'error',
  Timeout = 'timeout',
  Skipped = 'skipped',
  Throttled = 'throttled',
}

/**
 * The types of notes that can be returned
 */
export enum NoteType {
  MessageToBuyer = 'message_to_buyer',
  MessageFromBuyer = 'message_from_buyer',
  GiftMessage = 'gift_message',
  Internal = 'internal',
}

/**
 * Types of delivery confirmations
 */
export enum DeliveryConfirmationType {
  None = 'none',
  Delivery = 'delivery',
  Signature = 'signature',
  AdultSignature = 'adult_signature',
  DirectSignature = 'direct_signature',
}

/**
 * The types of itemized charges or credits that can be specified
 * for a shipment or sales order
 */
export enum ChargeType {
  Shipping = 'shipping',
  Delivery = 'delivery',
  Handling = 'handling',
  Oversize = 'oversize',
  SpecialGoods = 'special_goods',
  DeliveryConfirmation = 'delivery_confirmation',
  Insurance = 'insurance',
  Discount = 'discount',
  Fuel = 'fuel',
  LocationFee = 'location_fee',
  Fee = 'fee',
  Pickup = 'pickup',
  Return = 'return',
  Notification = 'notification',
  Duty = 'duty',
  Tax = 'tax',
  Adjustment = 'adjustment',
  Coupon = 'coupon',
  Credit = 'credit',
  Debit = 'debit',
  GiftCertificate = 'gift_certificate',
  GiftWrapping = 'gift_wrapping',
  Promotion = 'promotion',
  Refund = 'refund',
  Uncategorized = 'uncategorized',
}

export enum TaxIdentifierType {
  /** @description Tax Identification Number  */
  TIN = 'tin',
  /** @description Employer Identification Number  */
  EIN = 'ein',
  /** @description Social Security Number  */
  SSN = 'ssn',
  /** @description Value Added Tax Identification Number  */
  VAT = 'vat',
  /** @description Economic Operators Registration and Identification Number  */
  EORI = 'eori',
  /** @description Import One-Stop Shop Number
   * The IOSS allows suppliers and electronic interfaces selling imported goods to buyers in the EU to
   * collect, declare and pay the VAT to the tax authorities, instead of making the buyer pay the VAT at the
   * moment the goods are imported into the EU as it was previously the case (for products over 22 EUR).
   * https://ec.europa.eu/taxation_customs/business/vat/ioss_en
   */
  IOSS = 'ioss',
  /** @description Permanent Account Number
   * A ten-character alphanumeric identifier, issued by the Indian Income Tax
   */
  PAN = 'pan',
  /** @description Norway's VAT on E-Commerce number
   * https://www.skatteetaten.no/en/business-and-organisation/vat-and-duties/vat/foreign/e-commerce-voec/
   */
  VOEC = 'voec',
}
