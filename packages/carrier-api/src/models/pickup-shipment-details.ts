import { PickupShipment } from "./pickup-shipment";

export interface PickupShipmentDetails {
  /**
   * Service category for the carrier.
   */
  pickup_service_code?: null | string;
  /**
   * The shipments that will be picked up.
   */
  shipments?: PickupShipment[] | null;
}
