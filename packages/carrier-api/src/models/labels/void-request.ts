/** @description Basic structure for a request to void a label */
export interface VoidRequest {
  void_request_id: string;
  tracking_number?: string;
  carrier_transaction_id?: string;
}
