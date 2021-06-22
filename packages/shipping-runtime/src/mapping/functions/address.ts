import {
  AddressBase,
  AddressResidentialIndicator,
  PudoLocation,
} from '@shipengine/connect-carrier-api/lib/models';
import {
  AddressPOJO,
  AddressWithContactInfoPOJO,
  AddressWithContactInfoAndPickupLocationPOJO,
  PickupLocationPOJO,
  Country,
  PersonNamePOJO,
} from '@shipengine/connect-sdk';

export const excludeNullsFromAddressLines = (
  addressLines: (string | null)[] | null | undefined,
): string[] => {
  const cleanedAddress: string[] = [];
  addressLines?.forEach((line) => {
    if (line !== null && line !== '') {
      cleanedAddress.push(line);
    }
  });
  return cleanedAddress;
};

export const convertResidentialIndicatorToBoolean = (
  residentialIndicator: AddressResidentialIndicator | null | undefined,
): boolean | undefined => {
  if (!residentialIndicator) {
    return undefined;
  }
  if (residentialIndicator === AddressResidentialIndicator.Unknown) {
    return undefined;
  }
  return residentialIndicator === AddressResidentialIndicator.Yes;
};

const emptyDxPersonName: PersonNamePOJO = { given: '' };

const emptyDxAddressWithContact: AddressWithContactInfoPOJO = {
  addressLines: [],
  cityLocality: '',
  stateProvince: '',
  country: Country.UnitedStates,
  postalCode: '',
  email: '',
  phoneNumber: '',
  name: emptyDxPersonName,
  isResidential: undefined,
  company: '',
};
const emptyDxAddress: AddressPOJO = {
  addressLines: [],
  cityLocality: '',
  stateProvince: '',
  country: Country.UnitedStates,
  postalCode: '',
  isResidential: undefined,
  company: '',
};

const emptyDxPickupLocation: PickupLocationPOJO = {
  carrierId: '',
  relayId: '',
};

const emptyDxAddressWithContactAndPickup: AddressWithContactInfoAndPickupLocationPOJO = {
  addressLines: [],
  cityLocality: '',
  stateProvince: '',
  country: Country.UnitedStates,
  postalCode: '',
  email: '',
  phoneNumber: '',
  name: emptyDxPersonName,
  isResidential: undefined,
  company: '',
  pickupLocation: emptyDxPickupLocation,
};

export const mapAddressWithContact = (
  address: AddressBase | null | undefined,
): AddressWithContactInfoPOJO => {
  if (!address) {
    return emptyDxAddressWithContact;
  }
  const dxAddress: AddressWithContactInfoPOJO = {
    addressLines: excludeNullsFromAddressLines(address.address_lines),
    cityLocality: address.city_locality || '',
    stateProvince: address.state_province || '',
    country: address.country_code as Country,
    postalCode: address.postal_code,
    email: address.email || '',
    phoneNumber: address.phone_number || '',
    name: address.name || '',
    isResidential: convertResidentialIndicatorToBoolean(
      address.address_residential_indicator,
    ),
    company: address.company_name || '',
  };

  return dxAddress;
};

export const mapAddress = (
  address: AddressBase | null | undefined,
): AddressPOJO => {
  if (!address) {
    return emptyDxAddress;
  }
  return {
    addressLines: excludeNullsFromAddressLines(address.address_lines),
    cityLocality: address.city_locality || '',
    stateProvince: address.state_province || '',
    country: address.country_code as Country,
    postalCode: address.postal_code,
    isResidential: convertResidentialIndicatorToBoolean(
      address.address_residential_indicator,
    ),
    company: address.company_name || '',
  };
};

export const mapAddressWithContactAndPickup = (
  address: PudoLocation | null | undefined,
): AddressWithContactInfoAndPickupLocationPOJO => {
  if (!address) {
    return emptyDxAddressWithContactAndPickup;
  }

  const dxPickup: PickupLocationPOJO = {
    carrierId: address.carrier_code || '',
    relayId: address.location_id || '',
  };

  const dxAddress: AddressWithContactInfoAndPickupLocationPOJO = {
    addressLines: excludeNullsFromAddressLines(address.address_lines),
    cityLocality: address.city_locality || '',
    stateProvince: address.state_province || '',
    country: address.country_code as Country,
    postalCode: address.postal_code,
    email: address.email || '',
    phoneNumber: address.phone_number || '',
    name: address.name || '',
    isResidential: convertResidentialIndicatorToBoolean(
      address.address_residential_indicator,
    ),
    company: address.company_name || '',
    pickupLocation: dxPickup,
  };

  return dxAddress;
};
