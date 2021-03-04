import { mapCancelPickupResponse } from '../../../src/mapping/functions';
import { PickupCancellationOutcome } from '@shipengine/connect/lib/internal';
import { CancellationStatus } from '@shipengine/connect-sdk';

const transaction = {
	id: 'transactionId',
	language: 'en-US',
	session: {
		value: 1,
	},
};

const successfulResponse = new PickupCancellationOutcome({
	cancellationID: 'cancellationId',
	confirmationNumber: 'CONF1',
	status: CancellationStatus.Success,
	description: 'description',
	code: 'CODE1',
});

describe('Cancel Pickup Response', () => {
	describe('when given a fully formed successful pickup cancellation outcome', () => {
		const result = mapCancelPickupResponse(successfulResponse, transaction);
		it('it maps confirmation_id correctly', () =>
			expect(result.confirmation_id).toEqual('CONF1'));
		it('it maps successful correctly', () =>
			expect(result.successful).toEqual(true));
		it('it maps status correctly', () =>
			expect(result.status).toEqual('description'));
		it('it maps custom_properties correctly', () =>
			expect(result.custom_properties).toEqual({ carrier_code: 'CODE1' }));
		it('it maps metadata correctly', () =>
			expect(result.metadata).toEqual({ value: 1 }));
	});
});
