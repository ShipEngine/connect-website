import { ShipmentNotificationResult } from '../models';

/** @description The response for a NotifyShipments method */
export interface NotificationStatusResponse {
  /** @description A list of results for shipment notifications */
  notification_results: ShipmentNotificationResult[];
}
