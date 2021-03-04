import { ConfirmationTypes } from '@shipengine/connect-carrier-api/lib/models';
import { DeliveryConfirmationType } from '@shipengine/connect-sdk';

export const mapConfirmation = (
	confirmation?: ConfirmationTypes | null,
): DeliveryConfirmationType | undefined => {
	switch (confirmation) {
		case ConfirmationTypes.AdultSignature:
			return DeliveryConfirmationType.AdultSignature;
		case ConfirmationTypes.Delivery:
			return DeliveryConfirmationType.Delivery;
		case ConfirmationTypes.DirectSignature:
			return DeliveryConfirmationType.DirectSignature;
		case ConfirmationTypes.Signature:
			return DeliveryConfirmationType.Signature;
		case ConfirmationTypes.None:
			return DeliveryConfirmationType.None;
		default:
			return undefined;
	}
};
