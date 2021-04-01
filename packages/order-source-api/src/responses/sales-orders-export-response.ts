import { SalesOrder } from "../models";

/**
 * @description The response from an ExportSalesOrders method
 */
export interface SalesOrdersExportResponse {
  /** @description A list of sales orders to be imported */
  sales_orders: SalesOrder[];
  /** @description Any information necessary to make the next call to retrieve orders (paging, etc). If all orders have been retrieved return undefined @example '343', 'f356bf8c-665d-4164-96ef-337876d958ea' */
  cursor?: string;
}
