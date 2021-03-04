import { Charge, ChargeType } from '@shipengine/connect-sdk';
import { getTotalCosts } from '../../../src/mapping/functions';

const insuranceCharges: readonly Charge[] = [
	{
		amount: {
			currency: 'USD',
			value: 244.53,
		},
		type: ChargeType.Insurance,
		name: 'Insurance 1',
	},
	{
		amount: {
			currency: 'USD',
			value: 245.3,
		},
		type: ChargeType.Insurance,
		name: 'Insurance 2',
	},
];

const otherCharges: readonly Charge[] = [
	{
		amount: {
			currency: 'USD',
			value: 244.53,
		},
		type: ChargeType.LocationFee,
		name: 'Location Fee',
	},
	{
		amount: {
			currency: 'USD',
			value: 245.3,
		},
		type: ChargeType.Shipping,
		name: 'Shipping',
	},
	{
		amount: {
			currency: 'USD',
			value: 245.3,
		},
		type: ChargeType.SpecialGoods,
		name: 'Special Goods',
	},
	{
		amount: {
			currency: 'USD',
			value: 245.3,
		},
		type: ChargeType.Tax,
		name: 'Tax',
	},
];
describe('Total Cost', () => {
	const charges = [...insuranceCharges, ...otherCharges];
	it('the getTotalCosts properly sums and combines the totals into a new Currency type', () =>
		expect(getTotalCosts(charges)).toEqual({
			amount: '1470.26',
			currency: 'USD',
		}));
	it('the getTotalCharges method should return undefined if the charges array was empty', () =>
		expect(getTotalCosts([])).toEqual(undefined));
	it('the getTotalCharges method should return undefined if the charges array was undefined', () =>
		expect(getTotalCosts(undefined)).toEqual(undefined));
});
