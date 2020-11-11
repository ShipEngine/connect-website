import { DeliveryService, AddressWithContactInfoPOJO } from "@shipengine/connect-sdk";
import { buildAddressWithContactInfo } from "../factories/address";

/**
 * Returns a tuple of international shipment addresses [to, from]. Throws an error if addresses can not be resolved.
 */
export default function useDomesticShippingAddress(
  deliveryService: DeliveryService,
): [AddressWithContactInfoPOJO | undefined, AddressWithContactInfoPOJO | undefined] {
  let destinationCountryCode: string | undefined = deliveryService.availableCountries[0];
  let originCountryCode: string | undefined = deliveryService.availableCountries[0];
  
  return [
    buildAddressWithContactInfo(`${originCountryCode}-from`),
    buildAddressWithContactInfo(`${destinationCountryCode}-to`),
  ];
}
