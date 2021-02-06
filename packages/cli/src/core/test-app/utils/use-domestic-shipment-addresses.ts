import { DeliveryService, AddressWithContactInfoPOJO } from "@shipengine/connect-sdk";
import { buildAddressWithContactInfo } from "../factories/address";

/**
 * Returns a tuple of international shipment addresses [to, from]. Throws an error if addresses can not be resolved.
 */
export default function useDomesticShippingAddress(
  deliveryService: DeliveryService,
): [AddressWithContactInfoPOJO | undefined, AddressWithContactInfoPOJO | undefined] {
  const country: string | undefined = deliveryService.availableCountries.find(country => buildAddressWithContactInfo(`${country}-from`) && buildAddressWithContactInfo(`${country}-to`));
  return [
    buildAddressWithContactInfo(`${country}-from`),
    buildAddressWithContactInfo(`${country}-to`),
  ];
}
