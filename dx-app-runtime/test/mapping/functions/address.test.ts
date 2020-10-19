import {
	mapAddress,
	excludeNullsFromAddressLines,
	convertResidentialIndicatorToBoolean,
} from '../../../src/mapping/functions/address';
import { AddressResidentialIndicator } from '@ipaas/capi/models';

describe('Address', () => {
	describe('when the address lines are empty or null or undefined', () => {
		it('returns an empty array', () => {
			const results = excludeNullsFromAddressLines([null, null, '']);
			expect(results.length).toBe(0);
		});
	});

	describe('when the residential indicator is undefined or unknown', () => {
		it('sets the value to undefined', () => {
			const undefinedValue = convertResidentialIndicatorToBoolean(undefined);
			const unknownValue = convertResidentialIndicatorToBoolean(
				AddressResidentialIndicator.Unknown,
			);
			expect(undefinedValue).toBe(undefined);
			expect(unknownValue).toBe(undefined);
		});
	});

	describe('when the residential indicator is either yes or residential', () => {
		it('sets the value to be true', () => {
			const yes = convertResidentialIndicatorToBoolean(
				AddressResidentialIndicator.Yes,
			);
			const residential = convertResidentialIndicatorToBoolean(
				AddressResidentialIndicator.Residential,
			);
			expect(yes).toBe(true);
			expect(residential).toBe(true);
		});
	});

	describe('when an address has all undefined properties except country code and postal code', () => {
		const capiAddress = {
			address_lines: undefined,
			city_locality: undefined,
			company_name: undefined,
			country_code: 'US',
			email: undefined,
			first_name: undefined,
			is_eu: undefined,
			last_name: undefined,
			name: undefined,
			phone_number: undefined,
			postal_code: '78759',
			state_province: undefined,
			address_residential_indicator: undefined,
		};
		const address = mapAddress(capiAddress);
		it('sets address lines to an empty array', () =>
			expect(address.addressLines).toHaveLength(0));
		it('sets city to be an empty string', () =>
			expect(address.cityLocality).toBe(''));
		it('sets company name to be an empty string', () =>
			expect(address.company).toBe(''));
		it('sets email to be an empty string', () =>
			expect(address.email).toBe(''));
		it('sets name to be an empty string', () => expect(address.name).toBe(''));
		it('sets phone number to be an empty string', () =>
			expect(address.phoneNumber).toBe(''));
		it('sets state to be an empty string', () =>
			expect(address.stateProvince).toBe(''));
	});
	describe('when an address has all fields filled out', () => {
		const capiAddress = {
			address_lines: ['val1', 'val2'],
			city_locality: 'city',
			company_name: 'company',
			country_code: 'US',
			email: 'email',
			first_name: 'first_name',
			is_eu: false,
			last_name: 'last_name',
			name: 'name',
			phone_number: 'phone_number',
			postal_code: '78759',
			state_province: 'CA',
			address_residential_indicator: AddressResidentialIndicator.Unknown,
		};
		const address = mapAddress(capiAddress);
		it('sets address lines to the appropriate value', () =>
			expect(address.addressLines).toHaveLength(2));
		it('sets city to the appropriate value', () =>
			expect(address.cityLocality).toBe(capiAddress.city_locality));
		it('sets company name to the appropriate value', () =>
			expect(address.company).toBe(capiAddress.company_name));
		it('sets email to the appropriate value', () =>
			expect(address.email).toBe(capiAddress.email));
		it('sets name to the appropriate value', () =>
			expect(address.name).toBe(capiAddress.name));
		it('sets phone number to the appropriate value', () =>
			expect(address.phoneNumber).toBe(capiAddress.phone_number));
		it('sets state to the appropriate value', () =>
			expect(address.stateProvince).toBe(capiAddress.state_province));
		it('sets country to the appropriate value', () =>
			expect(address.country).toBe(capiAddress.country_code));
		it('sets postal code to the appropriate value', () =>
			expect(address.postalCode).toBe(capiAddress.postal_code));
	});
});

describe('address mapping', () => {
	it('returns an empty DX address with null CAPI', () => {
		const dxAddress = mapAddress(null);
		expect(dxAddress).not.toBeUndefined();
		expect(dxAddress.name).not.toBeUndefined();
		expect(dxAddress.addressLines?.length).toBe(0);
	});

	it('converts Address Residential Indicator to the correct boolean', () => {});
});
