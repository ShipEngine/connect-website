export interface CancelPickupResponse {
  /**
   * The confirmation id from the carrier associated with the cancellation request.
   */
  confirmation_id?: null | string;
  /**
   * A grab bag used to store additional information that might be useful for logging or
   * internal reporting.
   */
  custom_properties?: { [key: string]: string } | null;
  /**
   * The optional status returned by the carrier.
   */
  status?: null | string;
  /**
   * A flag for whether or not the cancellation was successful.
   */
  successful: boolean;
}
