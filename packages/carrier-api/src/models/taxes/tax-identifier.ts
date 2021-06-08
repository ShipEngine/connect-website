import { TaxIdentifierType } from "./tax-identifier-type";

/** @description Entity representing a Tax Identification number, type, and country of registration. */
export interface TaxIdentifier {
  /** @description Identification number */
  id: string;
  /** @description The Tax ID type */
  type: TaxIdentifierType;
  /** @description The country where the Tax ID is registered with */
  registration_county?: string;
  /** @description Description of the tax ID that may give the customs agent more context */
  description?: string;
}
