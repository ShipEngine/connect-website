import { mapWeightGrams } from '../../../src/mapping/functions/weight';

const expectedResults: any[][] = [
    [undefined, undefined],
    [0, undefined],
    ['0', undefined],
    ['garbage', undefined],
    [1.132, { unit: 'g', value: 1.132 }],
    ['42.24', { unit: 'g', value: 42.24 }]
]
describe('Weight', () => {
    describe('Mapping Weight', () => {
        test.each(expectedResults)('mapWeightGrams(%s) maps to %o', (weight, expected) => {
            expect(mapWeightGrams(weight)).toEqual(expected);
        });
    });
})