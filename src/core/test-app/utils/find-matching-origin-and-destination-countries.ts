import { Country, DeliveryService } from "@shipengine/connect-sdk";

/**
 * Find the shared availableCountries from an array of delivery services
 */
export function findMatchingAvailableCountries(deliveryServices: DeliveryService[])
  : Country[] {
  const allCountries = Object.values(Country);
  if(deliveryServices.length < 2) {
    throw new Error("Multiple Delivery Services must be specified");
  }

  const sharedavailableCountries = deliveryServices.reduce((acc, currentDS) => {

    const filteredArray = [];

    for (const country of acc) {
      if (currentDS.availableCountries.includes(country)) {
        filteredArray.push(country);
      }
    }

    return filteredArray;

  }, deliveryServices[0].availableCountries);

  return sharedavailableCountries as Country[];
}
