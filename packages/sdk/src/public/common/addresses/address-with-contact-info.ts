import type { Address, AddressPOJO } from './address';
import type { ContactInfo, ContactInfoPOJO } from './contact-info';
import type { TaxIdentifier, TaxIdentifierPOJO } from '../tax-identifier';

/**
 * A mailing address with a person's contact info
 */
export interface AddressWithContactInfoPOJO
  extends AddressPOJO,
    ContactInfoPOJO {
  taxIdentifiers?: TaxIdentifierPOJO[];
}

/**
 * A mailing address with a person's contact info
 */
export interface AddressWithContactInfo extends Address, ContactInfo {
  taxIdentifiers?: TaxIdentifier[];
}
