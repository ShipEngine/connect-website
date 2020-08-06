import { DeliveryService, CarrierApp } from "@shipengine/integration-platform-sdk/lib/internal";

/**
 * Find a Domestic delivery service.
 */
export function findDomesticDeliveryService(
  app: CarrierApp,
): DeliveryService {

  for (const ds of app.deliveryServices) {
    for (const country of ds.originCountries) {
      if (ds.destinationCountries.includes(country)) {
        return ds;
      }
    }
  }

  throw new Error("Unable to find domestic delivery service");

}
