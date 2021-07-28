import { RequestBase } from './request-base';

/** @description A request to remove delivery options connection with an order source */
export interface RemoveDeliveryOptionsRequest extends RequestBase {
  /** @description Identifier for the connection in the order source */
  connection_id: string;
}
