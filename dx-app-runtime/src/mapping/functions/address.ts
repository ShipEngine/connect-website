import { Address, AddressResidentialIndicator } from "@ipaas/capi/models";
import {AddressWithContactInfoPOJO, Country, PersonNamePOJO} from '@shipengine/integration-platform-sdk';
import convertISOCountryCodeToCountryEnum from './country-conversion';

const excludeNullsFromAddressLines = (addressLines: (string | null)[] | null | undefined): string[] => {
  if (!addressLines) {
    return [];
  }
  const cleanedAddressLines = addressLines.map((addressLine) => {
    return addressLine || '';
  });

  return cleanedAddressLines;
}

const convertResidentialIndicatorToBoolean = (residentialIndicator: AddressResidentialIndicator | null | undefined): (boolean | undefined) => {
  if (!residentialIndicator) {
    return undefined;
  }
  return (residentialIndicator === AddressResidentialIndicator.Yes || residentialIndicator === AddressResidentialIndicator.Residential);
}

const emptyDxPersonName: PersonNamePOJO = {given: ""};

const emptyDxAddress: AddressWithContactInfoPOJO = {
  addressLines: [],
  cityLocality: '',
  stateProvince: '',
  country: Country.UnitedStates,
  postalCode: '',
  email: '',
  phoneNumber: '',
  phoneNumberExtension: '',
  name: emptyDxPersonName,
  isResidential: undefined,
  company: '',
  timeZone: ''
};

export const mapAddressToAddressWithContactInfoPOJO = (address: Address | null | undefined): AddressWithContactInfoPOJO => {
  if(!address) {
    return emptyDxAddress;
  }
  const dxAddress: AddressWithContactInfoPOJO = {
    phoneNumberExtension: "",
    addressLines: excludeNullsFromAddressLines(address.address_lines),
    cityLocality: address.city_locality || '',
    stateProvince: address.state_province || '',
    country: convertISOCountryCodeToCountryEnum(address.country_code),
    postalCode: address.postal_code,
    email: address.email || '',
    phoneNumber: address.phone_number || '',
    name: {
      given: address.first_name ?? "",
      family: address.last_name ?? "",
      middle: "", // TODO: We don't send over middle names.
      suffix: "", // TODO: We don't send over suffix
      title: "" // TODO: We don't send over title
    },
    isResidential: convertResidentialIndicatorToBoolean(address.address_residential_indicator),
    company: address.company_name || '',
    timeZone: "America/Chicago" // TODO: We don't send over timeZone
  };

  return dxAddress;
};
