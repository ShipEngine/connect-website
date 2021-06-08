import { TaxIdentifierType } from "./tax-identifier-type";

/** @description Entity representing a Tax Identification number, type, and country of registration. */
export interface TaxIdentifier {
  /** @description Identification number */
  Id: string;
  /** @description The Tax ID type */
  Type: TaxIdentifierType;
  /** @description The country where the Tax ID is registered with */
  RegistrationCounty?: string;
  /** @description Description of the tax ID that may give the customs agent more context */
  Description?: string;
}
