import { RequestBase } from "./request-base";

export interface OrderAcknowledgement {
  order_id: string;
  order_number?: string;
  imported_date: string;
  integration_context?: any;
}

export interface AcknowledgeOrdersRequest extends RequestBase {
  orders: OrderAcknowledgement[];
}
