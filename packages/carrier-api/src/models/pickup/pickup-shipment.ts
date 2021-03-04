import { Identifier } from "../identifier";
import { ShippedPackage } from "./shipped-package";

export interface PickupShipment {
  tracking_number?: string;
  alternative_identifiers?: Identifier[];
  service_code?: string;
  packages?: ShippedPackage[];
  advanced_options?: { [key: string]: string };
}
