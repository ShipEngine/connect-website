import { HttpRequest } from "./client";

export interface VerifyOrdersRequest {
  operation: "verify_orders";
  session_id: string;
  sales_order_ids: string[];
}

export interface VerifyOrder {
  sales_order_id: string;
  succeeded: boolean;
  reason_for_failure?: string;
}


export type VerifyOrdersResponse = Array<VerifyOrder>;

/**
 * This is a mock implementation of a carrier's API that generates a label for a shipment
 */
export function verifyOrders(request: HttpRequest & VerifyOrdersRequest): VerifyOrdersResponse {

  return request.sales_order_ids.map((sales_order_id) => {

    const response: VerifyOrder = {
      sales_order_id: sales_order_id,
      succeeded: Math.random() >= 0.1
    };

    if(!response.succeeded) {
      response.reason_for_failure = "Unable to process order id";
    }

    return response;
  });
}
