/** @description The result of an individual shipment notification request */
export interface ShipmentNotificationResult {
  /** @description The notification id from the request */
  notification_id: string;
  /** @description Indicates whether or not this notification was successful */
  succeeded: boolean;
  /** @description An optional confirmation code associated with this notification */
  confirmation_code?: string;
  /** @description If succeeded was false use this field to indicate why */
  failure_reason?: string;
}

/** @description The response for a NotifyShipments method */
export interface ShipmentNotificationResponse {
  /** @description A list of results for shipment notifications */
  notification_results: ShipmentNotificationResult[];
}
