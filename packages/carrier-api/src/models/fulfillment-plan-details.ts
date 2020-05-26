import {Identifier} from './identifier';

export interface FulfillmentPlanDetails {
  /**
   * A list of identifiers for the sales order.
   */
  external_sales_order_identifiers?: Array<null | Identifier> | null;
  /**
   * This property has been deprecated. Please use items.
   */
  fulfillment_plan_items?: null | FulfillmentPlanItems;
  /**
   * Information about the fulfillment plan item.
   */
  items?: Array<null | FulfillmentPlanItems> | null;
  /**
   * This model represents a raw external source of information.
   */
  raw_external_source?: null | RawExternalSource;
}

export interface FulfillmentPlanItems {
  /**
   * A list of identifiers specific to the selling channel.
   */
  external_product_identifiers?: Array<null | Identifier> | null;
  /**
   * A list of identifiers for the sales order.
   */
  external_sales_order_identifiers?: Array<null | Identifier> | null;
  /**
   * The name of the item.
   */
  name?: null | string;
  /**
   * The number of items.
   */
  quantity?: number | null;
}
export interface RawExternalSource {
  /**
   * The code specific to a marketplace.
   */
  marketplace_code?: null | string;
}
