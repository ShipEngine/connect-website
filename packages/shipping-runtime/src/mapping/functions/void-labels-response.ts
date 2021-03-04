import { CancellationStatus, Transaction } from '@shipengine/connect-sdk';
import { ShipmentCancellationOutcome } from '@shipengine/connect-sdk/lib/internal';
import { VoidResponse } from '@shipengine/connect-carrier-api/lib/models';
import { VoidLabelsResponse } from '@shipengine/connect-carrier-api/lib/responses';

export const mapVoidResponse = (
	response: ShipmentCancellationOutcome,
): VoidResponse => {
	return {
		void_request_id: response.cancellationID,
		errors:
			response.status !== CancellationStatus.Success
				? [response.description || 'Error']
				: undefined,
		message: response.description,
	};
};

export const mapVoidLabelsResponse = (
	responses: ShipmentCancellationOutcome[],
	transaction: Transaction,
): VoidLabelsResponse => {
	return {
		void_responses: responses.map(mapVoidResponse),
		metadata: {
			...transaction.session,
		},
	};
};
