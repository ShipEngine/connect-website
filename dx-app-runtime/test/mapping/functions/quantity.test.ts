import { mapQuantity } from '../../../src/mapping/functions/quantity';

const minimumQuantity = { value: 1 };

const expectedResults: any[][] = [
    [undefined, minimumQuantity],
    ['', minimumQuantity],
    ['garbage', minimumQuantity],
    [0, minimumQuantity],
    [1, minimumQuantity],
    [5, { value: 5 }],
    ['5', { value: 5 }]
]
describe('Quantity', () => {
    describe('Mapping Quantity', () => {
        test.each(expectedResults)('mapQuantity(%o) maps to %s', (quantity, expected) => {
            expect(mapQuantity(quantity)).toEqual(expected);
        });
    });
})