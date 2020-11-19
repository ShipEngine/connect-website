import { ShipFrom } from '../addresses/ship-from';

export interface PickupLocationDetails {
  pickup_address?: ShipFrom;
  location_notes?: string;
  pickup_options?: { [key: string]: string };
}
