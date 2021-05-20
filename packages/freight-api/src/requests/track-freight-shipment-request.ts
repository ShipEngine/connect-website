import { BaseCarrierRequest } from "./base-carrier-request";

/**
 * Get the status of a freight shipment via the assigned PRO number.
 */
export interface TrackFreightShipmentRequest extends BaseCarrierRequest {
  pro_number: string;
}
