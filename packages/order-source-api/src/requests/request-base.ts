import { SalesOrderStatus } from "../models";

/**
 * @description Represents the auth information sent with every request
 */
export interface Auth {
  /** @description The unique identifier for the type of order source */
  order_source_api_code: string;
  /** @description The username of the seller making the request for this order source */
  username?: string;
  /** @description The password of the seller making the request for this order source */
  password?: string;
  /** @description The access token of the seller making the request for this order source */
  access_token?: string;
  /** @description The api key of the seller making the request for this order source */
  api_key?: string;
  /** @description The url of the sellers store, only used in cases where the 3rd party api can be hosted on a seller by seller basis */
  url?: string;
  /** @description Additional source-specific information needed to connect to the API. */
  connection_context?: any;
}

/** @description seller specified mappings for custom statuses coming from the 3rd parties api and the SalesOrderStatus they should map to. */
export interface SalesOrderStatusMapping {
  /** @description The raw status string used by the order source */
  source_status: string;
  /**
   * @description The sales order status.
   * @example 'AwaitingPayment','AwaitingShipment','Cancelled','Completed','OnHold','PendingFulfillment'
   */
  maps_to: SalesOrderStatus;
}

/**
 * @description This represents information shared by all requests
 */
export interface RequestBase {
  /** @description A randomly generated transaction ID, used to correlate the request and response */
  transaction_id: string;
  /** @description The authorization information necessary to fulfill this request. */
  auth: Auth;
  /** @description seller specified mappings for custom statuses coming from the 3rd parties api and the SalesOrderStatus they should map to. */
  sales_order_status_mapping?: SalesOrderStatusMapping[];
}
