export enum ShipEngineErrorCode {
  generic = "generic",
  serialization = "serialization",
  validation = "validation",
  external_client_error = "external_client_error",
}

export interface DetailedError {
  external_error_code?: string;
  message?: string;
  external_http_status_code?: number;
  raw_external_context?: string;
  standardized_error_code: ShipEngineErrorCode;
}
