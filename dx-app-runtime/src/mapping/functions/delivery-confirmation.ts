import { Confirmation } from "@ipaas/capi";
import { DeliveryConfirmationType } from "@shipengine/connect-sdk";

export const mapDeliveryConfirmationToDx = (confirmation?: Confirmation | null): DeliveryConfirmationType | undefined => {
  switch (confirmation) {
    case Confirmation.AdultSignature:
      return DeliveryConfirmationType.AdultSignature;
    case Confirmation.Delivery:
      return DeliveryConfirmationType.Delivery;
    case Confirmation.DirectSignature:
      return DeliveryConfirmationType.DirectSignature;
    case Confirmation.Signature:
      return DeliveryConfirmationType.Signature;
    default:
      return DeliveryConfirmationType.None;
  }
}

export const mapDeliveryConfirmationToCapi = (confirmation: DeliveryConfirmationType): Confirmation => {
  switch (confirmation) {
    case DeliveryConfirmationType.AdultSignature:
      return Confirmation.AdultSignature;
    case DeliveryConfirmationType.Delivery:
      return Confirmation.Delivery;
    case DeliveryConfirmationType.DirectSignature:
      return Confirmation.DirectSignature;
    case DeliveryConfirmationType.Signature:
      return Confirmation.Signature;
    default:
      return Confirmation.None;
  }
}
