import { Address } from "./address";

export interface PickupLocationDetails {
  /**
   * Human readable location information for the driver to find the location.
   */
  location_notes?: null | string;
  /**
   * The physical address of the warehouse/pickup address.
   */
  pickup_address?: null | Address;
  /**
   * Custom options that are used by the carrier to determine pickup locations.
   */
  pickup_options?: { [key: string]: string } | null;
}
