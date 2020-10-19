const {
	mapRate,
	mapGetRatesResponse,
} = require('../../../src/mapping/functions');

const fullRate = {
	charges: [],
	deliveryService: {
		id: 'serviceId',
		code: 'serviceCode',
	},
};

const transaction = {
	id: 'transactionId',
	session: {
		value: 1,
	},
};

describe('Get Rates Response', () => {
	describe('Map Rate', () => {
		const result = mapRate(fullRate);
		it('it maps deliveryService.code to service_code', () =>
			expect(result.service_code).toEqual('serviceCode'));
		const resultWithoutDeliveryService = mapRate({
			...fullRate,
			deliveryService: undefined,
		});
		it('when deliveryService is undefined it maps service_code to undefined', () =>
			expect(resultWithoutDeliveryService.service_code).toEqual(undefined));
	});

	describe('Map Get Rates Response', () => {
		const result = mapGetRatesResponse(transaction, [fullRate, fullRate]);
		it('rates has the correct number of rates', () =>
			expect(result.rates.length).toEqual(2));
		it('metadata is mapped appropriately', () =>
			expect(result.metadata).toEqual(transaction.session));
	});
});
