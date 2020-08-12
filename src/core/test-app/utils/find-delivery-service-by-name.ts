import {
  DeliveryService,
  CarrierApp,
} from "@shipengine/connect-sdk/lib/internal";

/**
 * Finds a DeliveryService by its name or raises if one is not found.
 * @param {string} name - The name of the DeliveryService.
 * @param {CarrierApp} app - The app that containing the DeliveryService.
 */
export default function findDeliveryServiceByName(
  name: string,
  app: CarrierApp,
): DeliveryService {
  const deliveryService = app.deliveryServices.find(
    (deliveryService) => deliveryService.name === name,
  );
  if (!deliveryService)
    throw new Error(
      `shipengine.config.js deliveryServiceName: '${name}' does not exist`,
    );

  return deliveryService;
}
