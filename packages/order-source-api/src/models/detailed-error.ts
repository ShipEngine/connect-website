/** @description The standard error codes used by the platform */
export enum ShipEngineErrorCode {
  generic = "generic",
  serialization = "serialization",
  validation = "validation",
  external_client_error = "external_client_error",
}
/** @description This represents information that can be gathered about an error */
export interface DetailedError {
  /** @description This is the custom error code used by external systems @example "AMAZON_ERR_124", "shopify_bad_request_435323" */
  external_error_code?: string;
  /** @description An error message that will be bubbled up to the users */
  message?: string;
  /** @description The status code associated with this error */
  external_http_status_code?: number;
  /** @description The full response or error returned (serialized) */
  raw_external_context?: string;
  /** @description The standarized code associated with this error type */
  standardized_error_code: ShipEngineErrorCode;
}
