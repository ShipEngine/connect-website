/** @description Category for a billing line item */
export enum BillingCategories {
  Uncategorized = 'uncategorized',
  Shipping = 'shipping',
  Insurance = 'insurance',
  /** @description Charge for delivery confirmation, e.g. requiring adult signature */
  Confirm = 'confirm',
  Discount = 'discount',
  FuelCharge = 'fuel_charge',
  AdditionalFees = 'additional_fees',
  Tariff = 'tariff',
  Tax = 'tax',
  Delivery = 'delivery',
  Handling = 'handling',
  SpecialGoods = 'special_goods',
  Pickup = 'pickup',
  /** @description Charge for the location of the origin or destination */
  LocationFee = 'location_fee',
  /** @description Charge for non-standard sizes */
  Oversize = 'oversize',
  Returns = 'returns',
  Notifications = 'notifications',
}
