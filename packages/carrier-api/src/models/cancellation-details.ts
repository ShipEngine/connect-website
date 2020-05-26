export interface CancellationDetails {
  /**
   * Additional properties about the cancellation.
   */
  cancellation_options?: { [key: string]: string } | null;
  /**
   * The reason the customer is cancelling their pickup request
   */
  reason: CancellationReason;
  /**
   * Remarks about why the customer is cancelling the pickup.
   */
  remarks?: null | string;
}

/**
* The reason the customer is cancelling their pickup request
*/
export enum CancellationReason {
  CarrierFailedPickup = "carrier_failed_pickup",
  CostTooHigh = "cost_too_high",
  NotReady = "not_ready",
  Other = "other",
  ServiceTooSlow = "service_too_slow",
}
