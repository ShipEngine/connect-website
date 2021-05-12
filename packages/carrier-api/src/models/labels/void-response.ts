/** @description Basic structure for a response to void a label */
export interface VoidResponse {
  /** @description Id for the void response */
  void_request_id: string;
  /** @description Void message, if applicable */
  message?: string;
  /** @description Any errors from attempting to void */
  errors?: string[];
}
