import { Label } from "..";
import { ShipTo } from "../addresses/ship-to";
import { AdvancedOptions } from "../advanced-options";
import { Identifier } from "../identifier";
import { ShippedPackage } from "./shipped-package";

export interface ShippedShipment extends Label {
  tracking_number?: string;
  carrier_transaction_id?: string;
  ship_to?: ShipTo;
  alternative_identifiers?: Identifier[];
  service_code?: string;
  packages?: ShippedPackage[];
  advanced_options?: AdvancedOptions;
}
