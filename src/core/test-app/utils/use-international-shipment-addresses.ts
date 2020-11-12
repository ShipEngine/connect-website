import { DeliveryService, AddressWithContactInfoPOJO, Country } from "@shipengine/connect-sdk";
import { buildAddressWithContactInfo } from "../factories/address";

/**
 * Returns a tuple of international shipment addresses [to, from]. Throws an error if addresses can not be resolved.
 */
export default function useInternationalShipmentAddresses(
  deliveryService: DeliveryService,
): [AddressWithContactInfoPOJO, AddressWithContactInfoPOJO] {
  const allCountries = Object.values(Country);
  let originCountryCode: string | undefined = deliveryService.availableCountries.find(country => buildAddressWithContactInfo(`${country}-from`));
  let destinationCountryCode: string | undefined = allCountries.find(country => country !== originCountryCode && buildAddressWithContactInfo(`${country}-to`));

  if(!originCountryCode || !destinationCountryCode) {
    throw new Error(`useInternationalShipmentAddresses error. Unable to find address in ${deliveryService.availableCountries}`);
  }
  const fromAddress = buildAddressWithContactInfo(`${originCountryCode}-from`);
  const toAddress = buildAddressWithContactInfo(`${destinationCountryCode}-to`);

  return [fromAddress!, toAddress!];
}
