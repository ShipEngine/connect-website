import { Confirmation } from '@ipaas/capi';
import { DeliveryConfirmationType } from '@shipengine/connect-sdk';

export const mapConfirmation = (
	confirmation?: Confirmation | null,
): DeliveryConfirmationType | undefined => {
	switch (confirmation) {
		case Confirmation.AdultSignature:
			return DeliveryConfirmationType.AdultSignature;
		case Confirmation.Delivery:
			return DeliveryConfirmationType.Delivery;
		case Confirmation.DirectSignature:
			return DeliveryConfirmationType.DirectSignature;
		case Confirmation.Signature:
			return DeliveryConfirmationType.Signature;
		case Confirmation.None:
			return DeliveryConfirmationType.None;
		default:
			return undefined;
	}
};
