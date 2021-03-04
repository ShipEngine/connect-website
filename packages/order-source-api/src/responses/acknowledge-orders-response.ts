export interface OrderAcknowledgementResponse {
  order_id: string;
  succeeded: boolean;
  failure_reason?: string;
}

export interface AcknowledgeOrdersResponse {
  responses: OrderAcknowledgementResponse[];
}
