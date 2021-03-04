import { mapVoidLabelsRequest } from '../../../src/mapping/functions';
import { VoidLabelsRequest } from '@shipengine/connect-carrier-api/lib/requests';

const voidLabelRequest: VoidLabelsRequest = {
	transaction_id: 'transactionId',
	void_requests: [
		{
			void_request_id: 'id1',
			carrier_transaction_id: 'ct1',
			tracking_number: 'trackingNumber1',
		},
		{
			void_request_id: 'id2',
			carrier_transaction_id: 'ct2',
		},
		{
			void_request_id: 'id3',
			carrier_transaction_id: undefined,
			tracking_number: 'trackingNumber3',
		},
	],
};

const expected = [
	{
		cancellationID: 'id1',
		identifiers: { carrierTransactionId: 'ct1' },
		metadata: {},
		trackingNumber: 'trackingNumber1',
	},
	{
		cancellationID: 'id2',
		identifiers: { carrierTransactionId: 'ct2' },
		metadata: {},
		trackingNumber: undefined,
	},
	{
		cancellationID: 'id3',
		identifiers: { carrierTransactionId: '' },
		metadata: {},
		trackingNumber: 'trackingNumber3',
	},
];

describe('Void Labels', () => {
	describe('when given a full void labels request', () => {
		it('maps the fields properly', () =>
			expect(mapVoidLabelsRequest(voidLabelRequest)).toEqual(expected));
	});
});
