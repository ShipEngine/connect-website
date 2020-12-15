export interface ShippingPreferences {
  digital_fulfillment?: boolean;
  additional_handling?: boolean;
  bill_duties_to_sender?: boolean;
  do_not_prepay_postage?: boolean;
  gift?: boolean;
  has_alcohol?: boolean;
  insurance_requested?: boolean;
  non_machinable?: boolean;
  saturday_delivery?: boolean;
  show_postage?: boolean;
  suppress_email_notify?: boolean;
  suppress_marketplace_notify?: boolean;
  deliver_by_date?: string;
  hold_until_date?: string;
  ready_to_ship_date?: string;
  ship_by_date?: string;
  preplanned_fulfillment_id?: string;
  shipping_service?: string;
  package_type?: string;
  insured_value?: number;
  is_premium_program?: boolean;
  premium_program_name?: string;
  /** The warehouse name associated with the requested warehouse  */
  requested_warehouse?: string;
}
