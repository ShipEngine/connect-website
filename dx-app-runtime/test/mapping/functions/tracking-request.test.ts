import { TrackRequest } from '@ipaas/capi';
import { mapTrackingRequest } from '../../../src/mapping/functions/';

const trackingRequest: TrackRequest = {
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
		{
			type: undefined,
			value: 'value3',
		},
		{
			type: 'id4',
			value: undefined,
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
			expect(mapTrackingRequest(request).trackingNumber).toEqual(
				'trackingNumber',
			);
		});
	});
});
