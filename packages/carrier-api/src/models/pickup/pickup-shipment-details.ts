import { PickupShipment } from "./pickup-shipment";

export interface PickupShipmentDetails {
  pickup_service_code?: string;
  shipments?: PickupShipment[];
}
