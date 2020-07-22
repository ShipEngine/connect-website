import { Country } from "@shipengine/integration-platform-sdk";
import { CarrierApp } from "@shipengine/integration-platform-sdk";

/**
 * Find the shared origin and destination countries from an array of delivery services
 */
export function findMatchingDeliveryServicesByCountries(app: CarrierApp)
  : { originCountries: Country[]; destinationCountries: Country[] } {

  const deliveryServices = app.deliveryServices;

  const sharedOriginCountries = deliveryServices.reduce((acc, currentDS) => {

    const filteredArray = [];

    for (let country of acc) {
      if (currentDS.originCountries.includes(country)) {
        filteredArray.push(country);
      }
    }

    return filteredArray;

  }, deliveryServices[0].originCountries);

  const sharedDestinationCountries = deliveryServices.reduce((acc, currentDS) => {

    const filteredArray = [];

    for (let country of acc) {
      if (currentDS.destinationCountries.includes(country)) {
        filteredArray.push(country);
      }
    }

    return filteredArray;

  }, deliveryServices[0].destinationCountries);

  if (sharedOriginCountries.length > 0 && sharedDestinationCountries.length > 0) {

    return { originCountries: Object.assign([], sharedOriginCountries), destinationCountries: Object.assign([], sharedDestinationCountries) };
  }

  throw new Error("Specified delivery services do not share origin and destination countries");
}
