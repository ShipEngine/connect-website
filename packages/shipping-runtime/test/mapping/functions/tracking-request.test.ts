import { TrackingRequest } from '@shipengine/connect-carrier-api/lib/requests';
import { mapTrackingRequest } from '../../../src/mapping/functions/';

const trackingRequest: TrackingRequest = {
	tracking_number: 'trackingNumber',
	transaction_id: 'transactionId',
	metadata: {
		goober: 'value',
	},
	is_return: false,
	identifiers: [
		{
			type: 'id1',
			value: 'value1',
		},
		{
			type: 'id2',
			value: 'value2',
		},
	],
};

describe('Tracking Request', () => {
	describe('when given a full tracking request', () => {
		it('it maps properly', () =>
			expect(mapTrackingRequest(trackingRequest)).toEqual({
				identifiers: { id1: 'value1', id2: 'value2' },
				metadata: { goober: 'value' },
				returns: { isReturn: false },
				trackingNumber: 'trackingNumber',
			}));
	});
	describe('when no tracking_number is defined in the root', () => {
		it('it maps from identifiers tracking_number', () => {
			const request = {
				identifiers: [{ type: 'tracking_number', value: 'trackingNumber' }],
			};
			expect(mapTrackingRequest(request as TrackingRequest).trackingNumber).toEqual(
				'trackingNumber',
			);
		});
	});
});
