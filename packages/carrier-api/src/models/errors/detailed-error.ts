import { StandardizedErrorCode } from './standardized-error-code';

/** @description Basic structure for an error */
export interface DetailedError {
  standardized_error_code: StandardizedErrorCode;
  external_error_code?: string;
  message?: string;
  external_http_status_code?: number;
  raw_external_context?: string;
}
