import { DeliveryService } from "@shipengine/integration-platform-sdk";
import { buildAddressWithContactInfo } from "../factories/address";

/**
 * Returns a tuple of international shipment addresses [to, from]. Throws an error if addresses can not be resolved.
 * @param {object} defaultObject - The default object.
 * @param {object} configObject - The config object. Key/values in this object receive precedence.
 */
export default function useDomesticShippingAddress(
  deliveryService: DeliveryService,
) {
  let destinationCountryCode: string | undefined;
  let originCountryCode: string | undefined;

  if (deliveryService.originCountries.length === 1) {
    originCountryCode = deliveryService.originCountries[0];
    destinationCountryCode = deliveryService.destinationCountries.find(
      (destinationCountry) => destinationCountry === originCountryCode,
    );
    if (!destinationCountryCode)
      throw new Error(
        "useDomesticShippingAddress: can not resolve destination country",
      );
  } else if (deliveryService.destinationCountries.length === 1) {
    destinationCountryCode = deliveryService.destinationCountries[0];
    originCountryCode = deliveryService.originCountries.find(
      (originCountry) => originCountry === destinationCountryCode,
    );
    if (!originCountryCode)
      throw new Error(
        "useDomesticShippingAddress: can not resolve origin country",
      );
  } else {
    originCountryCode = deliveryService.originCountries[0];
    destinationCountryCode = deliveryService.destinationCountries.find(
      (destinationCountry) => destinationCountry === originCountryCode,
    );
    if (!destinationCountryCode)
      throw new Error(
        "useDomesticShippingAddress: can not resolve destination country",
      );
  }

  return [
    buildAddressWithContactInfo(`${originCountryCode}-from`),
    buildAddressWithContactInfo(`${destinationCountryCode}-to`),
  ];
}
