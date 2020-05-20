import {
  AddressPOJO,
  AddressWithContactInfoPOJO,
  Country,
} from "@shipengine/integration-platform-sdk";

export function buildAddressWithContactInfo(
  countryCode: string,
): AddressWithContactInfoPOJO {
  const countryMap: Record<string, AddressWithContactInfoPOJO> = {
    US: {
      company: "US International",
      addressLines: ["3800 N Lamar Blvd #220"],
      cityLocality: "Austin",
      stateProvince: "TX",
      postalCode: "78756",
      country: Country.UnitedStates,
      timeZone: "America/Chicago",
      name: "John Doe",
      email: "john.doe@gmail.com",
      phoneNumber: "123-456-7890",
    },
  };

  return countryMap[countryCode];
}

export function buildAddress(countryCode: string): AddressPOJO {
  const countryMap: Record<string, AddressPOJO> = {
    US: {
      company: "US International",
      addressLines: ["3800 N Lamar Blvd #220"],
      cityLocality: "Austin",
      stateProvince: "TX",
      postalCode: "78756",
      country: Country.UnitedStates,
      timeZone: "America/Chicago",
    },
  };

  return countryMap[countryCode];
}
