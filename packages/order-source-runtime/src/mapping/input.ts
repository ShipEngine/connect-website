import { Input } from '@shipengine/connect-sdk/lib/internal';

export function mapCountry(countryCode: string | undefined): Input.Country {
  if (!countryCode) {
    return Input.Country.UnitedStates;
  }
  var matchingCountry = Object.keys(Input.Country).find(
    (key) => Input.Country[key as keyof typeof Input.Country] === countryCode,
  ) as keyof typeof Input.Country;
  return Input.Country[matchingCountry];
}
