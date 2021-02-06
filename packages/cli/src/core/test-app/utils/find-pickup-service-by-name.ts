import {
  PickupService,
  CarrierApp,
} from "@shipengine/connect-sdk/lib/internal";

/**
 * Finds a DeliveryService by its name or raises if one is not found.
 * @param {string} name - The name of the DeliveryService.
 * @param {CarrierApp} app - The app that containing the DeliveryService.
 */
export default function findPickupServiceByName(
  name: string,
  app: CarrierApp,
): PickupService {
  const pickupService = app.pickupServices.find(
    (pickupService) => pickupService.name === name,
  );
  if (!pickupService)
    throw new Error(
      `connect.config.js pickupServiceName: '${name}' does not exist`,
    );

  return pickupService;
}
