import { DeliveryService, CarrierApp } from "@shipengine/connect-sdk/lib/internal";

/**
 * Find an Insurable delivery service
 */
export function findInsurableDeliveryService(
  app: CarrierApp,
): DeliveryService {

  for (const ds of app.deliveryServices) {
    if (ds.isInsurable) {
      return ds;
    }
  }
  throw new Error("Unable to find delivery service that supports insurance");
}
