import { Product } from './product';
import { Charge } from './charge';

/** @description An individual item in a sales order */
export interface SalesOrderItem {
  /** @description An ID for the line item for the vendor API */
  line_item_id?: string;
  /** @description A description of the sales order item - which may differ from the product description */
  description: string;
  /** @description The product associated with this order item */
  product?: Product;
  /** @description The item quantity for this sales order item */
  quantity: number;
  /** @description The amount of the currency per unit */
  unit_price?: number;
  /** @description A list of tax charges. The description can convey the jurisdiction */
  taxes?: Charge[];
  /** @description A list of shipping charges. */
  shipping_charges?: Charge[];
  /** @description A list of adjustments applied that influence the order total. For example, promotions/discounts/coupons. The amount should always be a quantify of currency, not a percentage. */
  adjustments?: Charge[];
  /** @description The url for the item being purchased */
  item_url?: string;
  /** @description The (ISO 8601) datetime (UTC) associated with when this item was last modified @example "2021-03-31T18:21:14.858Z" */
  modified_date_time?: string;
}
