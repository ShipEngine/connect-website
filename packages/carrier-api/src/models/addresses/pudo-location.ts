import { AddressBase } from './address-base';

/** @description Pickup/Dropoff location used by carriers */
export interface PudoLocation extends AddressBase {
  /** @description Standardized carrier code the location id belongs to */
  carrier_code?: string;
  /** @description Location id needed to look up the location */
  location_id?: string;
}
