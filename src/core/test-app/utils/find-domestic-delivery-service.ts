import { DeliveryService, CarrierApp } from '@shipengine/integration-platform-sdk';

/**
 * Find a Domestic delivery service.
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
