import { DeliveryService, AddressWithContactInfoPOJO } from "@shipengine/connect-sdk";
import { buildAddressWithContactInfo } from "../factories/address";

/**
 * Returns a tuple of international shipment addresses [to, from]. Throws an error if addresses can not be resolved.
 */
export default function useDomesticShippingAddress(
  deliveryService: DeliveryService,
): [AddressWithContactInfoPOJO | undefined, AddressWithContactInfoPOJO | undefined] {
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
    for (const oc of deliveryService.originCountries) {
      destinationCountryCode = deliveryService.destinationCountries.find(
        (destinationCountry) => destinationCountry === oc,
      );

      // Check to make sure that we have a sample address on file.
      if (!buildAddressWithContactInfo(`${oc}-from`)) {
        destinationCountryCode = "";
      }
      else {
        originCountryCode = oc;
        break;
      }
    }
    if (!destinationCountryCode) {
      throw new Error(
        "useDomesticShippingAddress: can not resolve destination country",
      );
    }
  }

  return [
    buildAddressWithContactInfo(`${originCountryCode}-from`),
    buildAddressWithContactInfo(`${destinationCountryCode}-to`),
  ];
}
