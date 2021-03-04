import { Country } from '@shipengine/connect/lib/public/common/country';
import { mapCountries, updateTrackingUrlTemplate } from '../../../src/mapping/registry-data';

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


describe('Tracking Template', () => {
	const expected: any[][] = [
		[undefined, undefined],
		['', undefined],
		['test{}', 'test{0}'],
		['test{0}', 'test{0}'],
		['{}test{}', '{0}test{0}'],
	];
	test.each(expected)('updateTrackingUrlTemplate(%s) = %s', (input, result) => {
		expect(updateTrackingUrlTemplate(input)).toEqual(result);
	});
})
