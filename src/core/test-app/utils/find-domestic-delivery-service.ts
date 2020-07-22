import { DeliveryService, CarrierApp } from '@shipengine/integration-platform-sdk';

/**
 * Find a Domestic delivery service and returns a list of countries that you can use to
 * test domestic routes.
 */
export function findDomesticDeliveryService(
  app: CarrierApp,
): DeliveryService {

  for (let ds of app.deliveryServices) {
    for (let country of ds.originCountries) {
      if (ds.destinationCountries.includes(country)) {
        return ds;
      }
    }
  }

  throw new Error("Unable to find domestic delivery service");

}
