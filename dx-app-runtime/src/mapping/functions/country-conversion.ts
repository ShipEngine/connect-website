import { Country } from '@shipengine/integration-platform-sdk';

export default (countryCode: string | null | undefined): Country => {
  if (!countryCode) {
    return Country.UnitedStates;
  }
  var matchingCountry = Object.keys(Country).find(
    key => Country[key as keyof typeof Country] === countryCode
  ) as keyof typeof Country;
  return Country[matchingCountry];
};
