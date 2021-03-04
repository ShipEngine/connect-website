import { SalesOrder } from "../models";

export interface SalesOrdersExportResponse {
  sales_orders: SalesOrder[];
  cursor?: string;
}
