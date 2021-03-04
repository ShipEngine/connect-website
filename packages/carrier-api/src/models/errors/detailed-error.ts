import { StandardizedErrorCode } from "./standardized-error-code";

export interface DetailedError {
  standardized_error_code: StandardizedErrorCode;
  external_error_code?: string;
  message?: string;
  external_http_status_code?: number;
  raw_external_context?: string;
}
