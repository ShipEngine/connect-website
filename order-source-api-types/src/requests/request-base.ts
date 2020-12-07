import { SalesOrderStatus } from "../models";

export interface Auth {
  order_source_api_code: string;
  username?: string;
  password?: string;
  access_token?: string;
  api_key?: string;
  url?: string;
  connection_context?: any;
}

export interface SalesOrderStatusMapping {
  /** The raw status string used by the order source */
  source_status: string;
  /**
   * The sales order status. Values: 'AwaitingPayment',
   * 'AwaitingShipment', 'Cancelled', 'Completed', 'OnHold',
   * 'PendingFulfillment'
   */
  maps_to: SalesOrderStatus;
}

export interface RequestBase {
  transaction_id: string;
  auth: Auth;
  sales_order_status_mapping?: SalesOrderStatusMapping[];
}
