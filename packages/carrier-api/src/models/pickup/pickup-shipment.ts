import { ShipTo } from '../addresses/ship-to';
import { AdvancedOptions } from '../advanced-options';
import { Identifier } from '../identifier';
import { PickupPackage } from './pickup-package';

/** @description Basic structure for a pickup shipment */
export interface PickupShipment {
  tracking_number?: string;
  carrier_transaction_id?: string;
  ship_to?: ShipTo;
  alternative_identifiers?: Identifier[];
  service_code?: string;
  packages?: PickupPackage[];
  advanced_options?: AdvancedOptions;
}
