import { Output } from "@shipengine/connect-sdk/lib/internal";
import * as api from "@shipengine/connect-order-source-api";

export function mapName(name: Output.PersonName): string {
  return [name.title, name.given, name.middle, name.family, name.suffix].filter((s) => s).join(" ");
}

export function mapAddress(
  address: Output.AddressWithContactInfoAndPickupLocation | undefined
): api.Address | undefined {
  if (!address) {
    return;
  }

  const [address_line_1, address_line_2, address_line_3, ...others] = address.addressLines;

  let residential_indicator: string | undefined;
  if (address.isResidential !== undefined) {
    residential_indicator = address.isResidential ? "R" : "C";
  }

  const pickup_location: api.PickupLocation | undefined = address.pickupLocation
    ? {
        relay_id: address.pickupLocation.relayId,
        carrier_id: address.pickupLocation.carrierId,
      }
    : undefined;

  return {
    name: mapName(address.name),
    company: address.company,
    phone: address.phoneNumber,
    address_line_1,
    address_line_2,
    address_line_3,
    city: address.cityLocality,
    state_province: address.stateProvince,
    postal_code: address.postalCode,
    country_code: address.country,
    residential_indicator,
    is_verified: false,
    pickup_location,
  };
}

export function ignoreEmpty(input: string | undefined): string | undefined {
  return !!input ? input : undefined;
}
