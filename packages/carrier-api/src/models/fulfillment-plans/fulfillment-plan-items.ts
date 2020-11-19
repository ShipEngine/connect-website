import { Identifier } from '../identifier';

export interface FulfillmentPlanItems {
  external_sales_order_identifiers?: Identifier[];
  external_product_identifiers?: Identifier[];
  name?: string;
  quantity?: number;
}
