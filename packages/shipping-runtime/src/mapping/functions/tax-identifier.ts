import {
  TaxIdentifier as TaxIdentifierCapi,
  TaxIdentifierType as TaxIdentifierTypeCapi,
} from '@shipengine/connect-carrier-api/lib/models';
import { TaxIdentifierPOJO, TaxIdentifierType } from '@shipengine/connect-sdk';

export const mapTaxIdentifiers = (
  taxIdentifiersCapi: TaxIdentifierCapi[],
): TaxIdentifierPOJO[] => {
  if (!taxIdentifiersCapi) {
    return [];
  }

  return taxIdentifiersCapi.map(mapTaxIdentifier);
};

export const mapTaxIdentifier = (
  taxIdentifierCapi: TaxIdentifierCapi,
): TaxIdentifierPOJO => {
  return {
    id: taxIdentifierCapi.id,
    type: mapTaxIdentifierType(taxIdentifierCapi.type),
    registrationCountry: taxIdentifierCapi.registration_county,
    description: taxIdentifierCapi.description,
  };
};

export const mapTaxIdentifierType = (
  taxIdentifierTypeCapi: TaxIdentifierTypeCapi,
): TaxIdentifierType => {
  switch (taxIdentifierTypeCapi) {
    case TaxIdentifierTypeCapi.TIN:
      return TaxIdentifierType.TIN;

    case TaxIdentifierTypeCapi.EIN:
      return TaxIdentifierType.EIN;

    case TaxIdentifierTypeCapi.SSN:
      return TaxIdentifierType.SSN;

    case TaxIdentifierTypeCapi.VAT:
      return TaxIdentifierType.VAT;

    case TaxIdentifierTypeCapi.EORI:
      return TaxIdentifierType.EORI;

    case TaxIdentifierTypeCapi.IOSS:
      return TaxIdentifierType.IOSS;

    case TaxIdentifierTypeCapi.PAN:
      return TaxIdentifierType.PAN;

    case TaxIdentifierTypeCapi.VOEC:
      return TaxIdentifierType.VOEC;

    default:
      throw new Error(
        `${taxIdentifierTypeCapi} is not a supported tax identifier type.`,
      );
  }
};
