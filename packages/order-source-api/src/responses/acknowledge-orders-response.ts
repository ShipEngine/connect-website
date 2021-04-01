/** @description An individual order acknowledgement */
export interface OrderAcknowledgementResponse {
  /** @description The unique identifier of the sales order from the order source */
  order_id: string;
  /** @description Indicates whether or not we were able to acknowledge our import of the order with the order source */
  succeeded: boolean;
  /** @description If succeeded was false, this is where details can be put to describe why it failed */
  failure_reason?: string;
}

/** @description The response for the AcknowledgeOrders method */
export interface AcknowledgeOrdersResponse {
  /** @description A list of acknowledgement responses */
  responses: OrderAcknowledgementResponse[];
}
