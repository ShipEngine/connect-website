import { Product } from "./product";
import { Charge } from "./charge";

export interface SalesOrderItem {
  line_item_id?: string;
  description: string;
  product?: Product;
  quantity: number;
  unit_price?: number;
  taxes?: Charge[];
  shipping_charges?: Charge[];
  adjustments?: Charge[];
  item_url?: string;
  modified_date_time?: string;
}
