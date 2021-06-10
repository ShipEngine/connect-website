/**
 * Response shape for propagating / sending errors back to clients.
 *
 * Many of the properties in this type may be impossible to fill at runtime,
 * but Inventory Apps should make their best attempt based on the information
 * sent back from the 3rd-party inventory provider.
 */
export type ErrorResponse = {
  /** Summary of what went wrong. */
  message: string;
  /** Unique identifier for the request or operation that produced the error, if available. */
  transaction_id?: string;
  /** Error code received from the 3rd-party inventory provider, if available. */
  external_error_code?: number;
  /** Additional detail about what went wrong, if availabe. */
  details?: string;
  /** A suggested wait interval before the request should be retried, if applicable. */
  retry_after_seconds?: number;
};

export type NotSupportedResponse = ErrorResponse & {
  message: "This operation is not supported by this Inventory App. See app metadata details.";
};
