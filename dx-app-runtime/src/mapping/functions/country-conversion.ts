import { Country } from '@shipengine/integration-platform-sdk';

export default (countryCode: string | null | undefined): Country => {
  if(!countryCode) {
    return Country.UnitedStates
  }
  return Country[countryCode as keyof typeof Country];
}
