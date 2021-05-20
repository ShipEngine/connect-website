import { BaseCarrierResponse } from "./base-carrier-response";

export interface ScheduleFreightPickupResponse extends BaseCarrierResponse {
  /**
   * The carrier confirmation number for the shipment. If a confirmation number is not supplied the user will need to confirm the pickup with the carrier directly.
   */
  confirmation_number?: string;
  /**
   * The PRO number for the shipment assigned by the carrier. If a number is not returned here the carrier will issue one at the time of pickup.
   */
  pro_number?: string;
  /**
   * Optional message with notes about the pickup that the user should be made aware of.
   */
  message?: string;
}
