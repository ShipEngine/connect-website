import { Document } from './document';

/** @description This represents the shipping preferences specified for an order */
export interface ShippingPreferences {
  /** @description Indicates whether or not the item being delivered is a digital good or not */
  digital_fulfillment?: boolean;
  /** @description Indicates whether or not this shipment will require additional handling */
  additional_handling?: boolean;
  /** @description Indicates whether duties should be billed to the sender of the package */
  bill_duties_to_sender?: boolean;
  /** @description Indicates whether you must pay for postage at drop off, for carriers that usually require prepaid postage. */
  do_not_prepay_postage?: boolean;
  /** @description Indicates whether or not this order is a gift */
  gift?: boolean;
  /** @description Indicates whether or not this order contains alcohol */
  has_alcohol?: boolean;
  /** @description Indicates whether or not insurance has been requested for shipping this order */
  insurance_requested?: boolean;
  /** @description Indicates whether or not this order is nonmachinable (must be sorted outside of the standard, automated mail process) */
  non_machinable?: boolean;
  /** @description Indicates whether or not this order should be delivered on a saturday */
  saturday_delivery?: boolean;
  /** @description Indicates whether or not to allow display of postage paid on the shipping label */
  show_postage?: boolean;
  /** @description Indicates whether or not to supress email notifications to the buyer */
  suppress_email_notify?: boolean;
  /** @description Indicates whether or not to supress email notifications to the seller */
  suppress_marketplace_notify?: boolean;
  /** @description The (ISO 8601) datetime (UTC) associated with when the order needs to be delivered by @example "2021-03-31T18:21:14.858Z" */
  deliver_by_date?: string;
  /** @description The (ISO 8601) datetime (UTC) associated with how long to hold the order @example "2021-03-31T18:21:14.858Z" */
  hold_until_date?: string;
  /** @description The (ISO 8601) datetime (UTC) associated with when the order is ready to ship @example "2021-03-31T18:21:14.858Z" */
  ready_to_ship_date?: string;
  /** @description The (ISO 8601) datetime (UTC) associated with when the order needs to be shipped by @example "2021-03-31T18:21:14.858Z" */
  ship_by_date?: string;
  /** @description The identifer assigned by a fulfillment planning system at checkout (Delivery Options). */
  preplanned_fulfillment_id?: string;
  /** @description The requested shipping service for this fulfillment */
  shipping_service?: string;
  /** @description The requested package type for this fulfillment */
  package_type?: string;
  /** @description The amount of money being request for insurance on this shipment */
  insured_value?: number;
  /** @description true if the order was placed under the terms of the order source's premium program (Amazon Prime, Walmart+, etc) */
  is_premium_program?: boolean;
  /** @description The name of the premium program, if any. This is for informational purposes. Consumers should base all logic on is_premium_program flag. */
  premium_program_name?: string;
  /** @description The warehouse name associated with the requested warehouse  */
  requested_warehouse?: string;
  /** @description Any documents relevant to shipping that the order source provides */
  documents?: Document[];
}
