import { AddressBase } from "./address-base";
import { TaxIdentifier } from "../taxes/tax-identifier";

export interface ShipTo extends AddressBase {
  /** @description Tax IDs associated with the consignee */
  tax_identifiers?: TaxIdentifier[];
}
