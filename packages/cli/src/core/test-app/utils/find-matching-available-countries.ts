import { Country, DeliveryService } from "@shipengine/connect-sdk";

const matchReducer = (matchingCountries: Country[], newCountries: Country[]): Country[] => {
  return newCountries.filter(country => matchingCountries.includes(country));
};

/**
 * Find the shared availableCountries from an array of delivery services
 */
export function findMatchingAvailableCountries(deliveryServices: DeliveryService[])
  : Country[] {
  if(deliveryServices.length < 2) {
    throw new Error("Multiple Delivery Services must be specified");
  }

  const serviceCountries = deliveryServices.map(service => service.availableCountries as Country[]);
  const sharedCountries = serviceCountries.reduce(matchReducer, serviceCountries[0]);
  if(sharedCountries.length === 0) {
    throw new Error('Specified delivery services do not share origin and destination countries');
  }

  return sharedCountries;
}
