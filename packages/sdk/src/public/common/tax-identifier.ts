import type { TaxIdentifierType } from './enums';

/**
 * Entity representing a Tax Identification number, type, and country of registration.
 */
export interface TaxIdentifierPOJO {
  /**
   * Identification number
   */
  id?: string;

  /**
   * The Tax ID type
   */
  type: TaxIdentifierType;

  /**
   * The country where the Tax ID is registered with
   */
  registrationCountry?: string;

  /**
   * Description of the tax ID that may give the customs agent more context
   */
  description?: string;
}

/**
 * Entity representing a Tax Identification number, type, and country of registration.
 */
export interface TaxIdentifier {
  /**
   * Identification number
   */
  readonly id?: string;

  /**
   * The Tax ID type
   */
  readonly type: TaxIdentifierType;

  /**
   * The country where the Tax ID is registered with
   */
  readonly registrationCountry?: string;

  /**
   * Description of the tax ID that may give the customs agent more context
   */
  readonly description?: string;
}
