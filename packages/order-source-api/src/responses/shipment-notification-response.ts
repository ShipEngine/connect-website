export interface ShipmentNotificationResult {
  notification_id: string;
  succeeded: boolean;
  confirmation_code?: string;
  failure_reason?: string;
}

export interface ShipmentNotificationResponse {
  notification_results: ShipmentNotificationResult[];
}
