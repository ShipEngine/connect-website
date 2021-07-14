import { RequestBase } from './request-base';

export interface PendingNotification {
  /** @description A unique identifier to correlate this shipment notification with its result in the response */
  notification_id: string;
  /**
   * @description A unique identifier that is used to query the third party about the status of this notification, set in the shipment_notification response
   * @example "123245AB23", "{'id1': 123, 'id2': 'unique'}"
   */
  submission_id: string;
}

export interface NotificationStatusRequest extends RequestBase {
  /** @description An array of notifications that were pending confirmation from the third party */
  notifications: PendingNotification[];
}
