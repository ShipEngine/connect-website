import { mapTransaction } from '../../../src/mapping/functions/transaction';

describe('Transaction', () => {
	describe('when a request comes in', () => {
		const transaction = mapTransaction({
			transaction_id: 'transactionId',
			metadata: {
				value1: 'fun',
			},
		}, {
			language: 'en-US'
		});
		it('it can map the transaction from the request correctly', () =>
			expect(transaction).toEqual({
				id: 'transactionId',
				language: 'en-US',
				session: { value1: 'fun' },
			}));
		it('it sets transaction id to an empty string when the transaction_id is undefined', () =>
			expect(mapTransaction({} as any, {language: 'en-US'})).toEqual({ id: '', language: 'en-US', session: {} }));
	});
});
