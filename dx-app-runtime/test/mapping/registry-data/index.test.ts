import { Country } from '@shipengine/connect/lib/public/common/country';
import { mapCountries } from '../../../src/mapping/registry-data';

describe('Registry Data Mapping.', () => {
	describe('Map Countries', () => {
		it('it returns an empty array when it receives undefined', () =>
			expect(mapCountries(undefined)).toEqual([]));
		it('it returns a single country when duplicate countries are sent', () =>
			expect(
				mapCountries([Country.UnitedStates, Country.UnitedStates]),
			).toEqual([{ FromCountry: 'US' }]));
	});
});
