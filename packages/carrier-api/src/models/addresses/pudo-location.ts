import { AddressBase } from "./address-base";

export interface PudoLocation extends AddressBase {
  carrier_code?: string;
  location_id?: string;
}
