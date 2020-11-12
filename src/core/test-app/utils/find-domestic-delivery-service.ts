import { ServiceArea } from '@shipengine/connect-sdk';
import { DeliveryService, CarrierApp } from "@shipengine/connect-sdk/lib/internal";

/**
 * Find a Domestic delivery service.
 */
export function findDomesticDeliveryService(
  app: CarrierApp,
): DeliveryService {

  const service  = app.deliveryServices.find(service => service.serviceArea === undefined || service.serviceArea === ServiceArea.Domestic);
  if(service) {
    return service; 
  }
  
  throw new Error("Unable to find domestic delivery service");

}
