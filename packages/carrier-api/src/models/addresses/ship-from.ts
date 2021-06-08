import { AddressBase } from "./address-base";
import { TaxIdentifier } from "../taxes/tax-identifier";

export interface ShipFrom extends AddressBase {
  /** @description Tax IDs associated with the exporter */
  tax_identifiers?: TaxIdentifier[];
}
