import { mapCurrency } from '../../../src/mapping/functions/currency';

const zeroValueCurrency: any = {
	amount: '0',
};

const nanValueCurrency: any = {
	amount: 'garbage',
};

const validAmountNoCurrency: any = {
	amount: '240.24',
};

const validAmountNoCurrencyExpected = {
	value: 240.24,
	currency: '',
};

const validAmount = {
	amount: '300.23',
	currency: 'USD',
};
const validAmountExpected = {
	value: 300.23,
	currency: 'USD',
};

const expectedResults: any[][] = [
	[undefined, undefined],
	[zeroValueCurrency, undefined],
	[nanValueCurrency, undefined],
	[validAmountNoCurrency, validAmountNoCurrencyExpected],
	[validAmount, validAmountExpected],
];
describe('Currency', () => {
	describe('Mapping Currency', () => {
		test.each(expectedResults)(
			'mapCurrency(%o) maps to %o',
			(currency, expected) => {
				expect(mapCurrency(currency)).toEqual(expected);
			},
		);
	});
});
