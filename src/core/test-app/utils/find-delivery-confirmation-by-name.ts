import {
  DeliveryConfirmation,
  CarrierApp,
} from "@shipengine/connect-sdk/lib/internal";

/**
 * Finds a DeliveryConfirmation by its name or raises if one is not found.
 * @param {string} name - The name of the DeliveryConfirmation.
 * @param {CarrierApp} app - The app that containing the DeliveryConfirmation.
 */
export default function findDeliveryConfirmationByName(
  name: string,
  app: CarrierApp,
): DeliveryConfirmation {
  const deliveryConfirmation = app.deliveryConfirmations.find(
    (deliveryConfirmation) => deliveryConfirmation.name === name,
  );
  if (!deliveryConfirmation)
    throw new Error(
      `connect.config.js deliveryConfirmationName: '${name}' does not exist`,
    );

  return deliveryConfirmation;
}
