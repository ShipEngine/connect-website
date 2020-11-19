export interface BaseRequest {
  transaction_id: string;
  metadata?: { [key: string]: any };
}
