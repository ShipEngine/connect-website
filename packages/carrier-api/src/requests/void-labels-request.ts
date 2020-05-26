export interface VoidLabelsRequest {
  /**
   * This is an optional schemaless object that you may return with a successful response.
   * Anything returned under this key will be included in all future requests. For example,
   * you may store additional static properties about the end user or their connection to the
   * carrier. The maximum storage size for data under this key is 4KB.
   */
  metadata?: { [key: string]: any } | null;
  /**
   * The transaction ID uniquely represents this request. If the request is retried then this
   * transaction ID will be the same. You should only perform the requested action once per
   * given transaction ID.
   */
  transaction_id: string;
  /**
   * A request to void a particular label.
   */
  void_requests: Array<null | VoidRequest>;
}

export interface VoidRequest {
  /**
   * The Carrier provided unique transaction id from creating the label.
   */
  carrier_transaction_id?: null | string;
  /**
   * The Carrier provided tracking number for the label.
   */
  tracking_number?: null | string;
  /**
   * Uniquely identifies this request to void a label. Must be returned in a void response.
   */
  void_request_id: string;
}
