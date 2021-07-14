export enum NotificationStatus {
  success = 'success',
  failure = 'failure',
  pending = 'pending,',
}

/** @description The result of an individual shipment notification request */
export interface ShipmentNotificationResult {
  /** @description The notification id from the request */
  notification_id: string;
  /** @deprecated This property has been deprecated, please use status. */
  succeeded?: boolean;
  /** @description Indicates the status for the third party receiving this notification */
  status?: NotificationStatus;
  /** @description An optional confirmation code associated with this notification */
  confirmation_code?: string;
  /** @description If succeeded was false use this field to indicate why */
  failure_reason?: string;
  /**
   * @description A unique identifier that is used to query the third party about the status of this notification in the notification_status endpoint
   * @example "123245AB23", "{'id1': 123, 'id2': 'unique'}"
   */
  submission_id?: string;
}
