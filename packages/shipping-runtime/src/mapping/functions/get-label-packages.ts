import {
  Identifier,
  LabelPackage,
} from '@shipengine/connect-carrier-api/src/models';
import { Identifiers } from '@shipengine/connect-sdk';
import { PackageConfirmation } from '@shipengine/connect-sdk';

export const getLabelPackage = (
  packageConfirmation: PackageConfirmation,
): LabelPackage => {
  return {
    tracking_number: packageConfirmation.trackingNumber,
    alternative_identifiers: getAlternativeIdentifiers(
      packageConfirmation.identifiers,
    ),
  };
};

const getAlternativeIdentifiers = (
  identifiers: Identifiers | undefined,
): Identifier[] | undefined => {
  if (!identifiers) {
    return undefined;
  }
  const ret: Identifier[] = [];
  const keys = Object.keys(identifiers);
  keys.forEach((key) => {
    const value = identifiers[key];
    ret.push({
      type: key,
      value: value || '',
    });
  });
  return ret;
};
