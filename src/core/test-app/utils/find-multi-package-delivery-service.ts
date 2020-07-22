import {
  DeliveryService,
  CarrierApp,
} from "@shipengine/integration-platform-sdk";

/**
 * Finds a DeliveryService that supports multi-package shipments for a given application.
 * @param {CarrierApp} app - The app that containing the DeliveryService.
 */
export default function findMultiPackageDeliveryService(
  app: CarrierApp,
): DeliveryService {
  for (let deliveryService of app.deliveryServices) {
    if(deliveryService.allowsMultiplePackages) {
      return deliveryService;
    }
  }
  throw new Error("international delivery service not found");
}
