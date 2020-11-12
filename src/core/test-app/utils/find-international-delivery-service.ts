import { ServiceArea } from '@shipengine/connect-sdk';
import {
  DeliveryService,
  CarrierApp,
} from "@shipengine/connect-sdk/lib/internal";

/**
 * Finds an international DeliveryService for a given application.
 * @param {CarrierApp} app - The app that containing the DeliveryService.
 */
export default function findInternationalDeliveryService(
  app: CarrierApp,
): DeliveryService {
  const service = app.deliveryServices.find(service => service.serviceArea === ServiceArea.International || service.serviceArea === ServiceArea.Global);
  if(service) {
    return service;
  }
  throw new Error("international delivery service not found");
}
