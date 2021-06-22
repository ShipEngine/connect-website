import { ShipFrom } from '../addresses/ship-from';

/** @description Location details for pickup */
export interface PickupLocationDetails {
  pickup_address?: ShipFrom;
  /** @description Any notes that may be helpful for a driver to find the pickup location */
  location_notes?: string;
  /** @description Custom options that are used by the carrier to determine pickup locations */
  pickup_options?: { [key: string]: string };
}
