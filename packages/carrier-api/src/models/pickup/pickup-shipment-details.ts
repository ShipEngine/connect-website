import { PickupShipment } from './pickup-shipment';

/** @description Details for a pickup shipment */
export interface PickupShipmentDetails {
  pickup_service_code?: string;
  /** @description List of shipments to be picked up */
  shipments?: PickupShipment[];
}
