import { Identifier } from "../identifier";

/** @description Information about the fulfillment plan for a set of items */
export interface FulfillmentPlanItems {
  /** @description List of identifiers for the sales order */
  external_sales_order_identifiers?: Identifier[];
  /** @description List of identifiers specific to the selling channel */
  external_product_identifiers?: Identifier[];
  /** @description Name of the item */
  name?: string;
  /** @description Number of items */
  quantity?: number;
}
