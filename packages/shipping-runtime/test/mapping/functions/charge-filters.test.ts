import { Charge, ChargeType } from '@shipengine/connect';
import {
	insuranceChargeFilter,
	shippingChargeFilter,
	confirmationChargeFilter,
	otherChargeFilter,
	everythingButInsuranceFilter,
} from '../../../src/mapping/functions';

const shippingCharges: readonly Charge[] = [
	{
		amount: {
			currency: 'USD',
			value: 244.53,
		},
		type: ChargeType.Shipping,
		name: 'Insurance 1',
	},
	{
		amount: {
			currency: 'USD',
			value: 245.3,
		},
		type: ChargeType.Shipping,
		name: 'Insurance 2',
	},
];

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

const confirmationCharges: readonly Charge[] = [
	{
		amount: {
			currency: 'USD',
			value: 244.53,
		},
		type: ChargeType.DeliveryConfirmation,
		name: 'Location Fee',
	},
	{
		amount: {
			currency: 'USD',
			value: 245.3,
		},
		type: ChargeType.DeliveryConfirmation,
		name: 'Shipping',
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

describe('when we have a list of charges of various types', () => {
	const charges = [
		...insuranceCharges,
		...otherCharges,
		...confirmationCharges,
		...shippingCharges,
	];
	it('the shipping charge filter only returns a list of charges that have a type of Shipping', () =>
		expect(charges.filter(shippingChargeFilter)).toEqual(shippingCharges));
	it('the confirmation charge filter only returns a list of charges that have a type of DeliveryConfirmation', () =>
		expect(charges.filter(confirmationChargeFilter)).toEqual(
			confirmationCharges,
		));
	it('the insurance charge filter only returns a list of charges that have a type of Insurance', () =>
		expect(charges.filter(insuranceChargeFilter)).toEqual(insuranceCharges));
	it('the other charges filter only returns a list of charges that are neither shipping, delivery, or insurance', () =>
		expect(charges.filter(otherChargeFilter)).toEqual(otherCharges));
	it('the everything but insurance filter returns a list of all charges other than Insurance charges', () =>
		expect(charges.filter(everythingButInsuranceFilter)).toEqual([
			...otherCharges,
			...confirmationCharges,
			...shippingCharges,
		]));
});
