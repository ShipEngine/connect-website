import { RequestBase } from './request-base';

/**
 * @description This is a request for acknowledging that an order has been imported
 */
export interface OrderAcknowledgement {
  /** @description The unique identifier of the sales order from the order source */
  order_id: string;
  /** @description The customer facing identifier of the sales order */
  order_number?: string;
  /** @description The (ISO 8601) datetime (UTC) of when the order was imported @example "2021-03-31T18:21:14.858Z" */
  imported_date: string;
  /** @description Data provided by the order source that was included in the ExportSalesOrder response */
  integration_context?: string;
}

/** @description This is a request for acknowledging that an order has been imported */
export interface AcknowledgeOrdersRequest extends RequestBase {
  /** @description A list of orders needing to be acknowledged in order to successfully be imported into our system. */
  orders: OrderAcknowledgement[];
}
