import {
  DeliveryService,
  CarrierApp,
} from "@shipengine/integration-platform-sdk";

/**
 * Finds an international DeliveryService for a given application.
 * @param {CarrierApp} app - The app that containing the DeliveryService.
 */
export default function findInternationalDeliveryService(
  app: CarrierApp,
): DeliveryService {
  for (let deliveryService of app.deliveryServices) {
    if (
      deliveryService.serviceArea === "international" ||
      deliveryService.serviceArea === "global" ||
      // If there is more than 1 origin country this is international
      deliveryService.originCountries.length > 1 ||
      // If there is more than 1 destination country this is international
      deliveryService.destinationCountries.length > 1 ||
      // If there is only 1 origin & destination country but they are different this is international
      deliveryService.originCountries[0] !==
        deliveryService.destinationCountries[0]
    ) {
      return deliveryService;
    }
  }
  throw new Error("international delivery service not found");
}
