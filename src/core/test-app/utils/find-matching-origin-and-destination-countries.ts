import { Country, DeliveryService } from "@shipengine/connect-sdk";
import { buildAddressWithContactInfo } from '../factories/address';

/**
 * Find the shared origin and destination countries from an array of delivery services
 */
export function findMatchingOriginAndDestinationCountries(deliveryServices: DeliveryService[])
  : { originCountries: Country[]; destinationCountries: Country[] } {

  if(deliveryServices.length < 2) {
    throw new Error("Multiple Delivery Services must be specified");
  }

  const sharedOriginCountries = deliveryServices.reduce((acc, currentDS) => {

    const filteredArray = [];

    for (const country of acc) {
      if (currentDS.originCountries.includes(country)) {
        filteredArray.push(country);
      }
    }

    return filteredArray;

  }, deliveryServices[0].originCountries);

  const sharedDestinationCountries = deliveryServices.reduce((acc, currentDS) => {

    const filteredArray = [];

    for (const country of acc) {
      if (currentDS.destinationCountries.includes(country)) {
        filteredArray.push(country);
      }
    }

    return filteredArray;

  }, deliveryServices[0].destinationCountries);

  if (sharedOriginCountries.length > 0 && sharedDestinationCountries.length > 0) {

    const originCountries = sharedOriginCountries.filter((oc) => buildAddressWithContactInfo(`${oc}-from`));
    const destinationCountries = sharedDestinationCountries.filter((dc) => buildAddressWithContactInfo(`${dc}-to`));

    return { originCountries, destinationCountries };
  }

  throw new Error("Specified delivery services do not share origin and destination countries");
}
