import { mapDimensionsCM } from '../../../src/mapping/functions/dimensions';

const undefinedDimensions = {
    length: undefined,
    width: undefined,
    height: undefined
};
const zeroDimensions = {
    length: 0,
    width: 0,
    height: 0
}

const minimumDimensions = {
    length: 1,
    width: 0,
    height: 0
}
const minimumDimensionsExpected = {
    ...minimumDimensions,
    unit: 'cm'
}

const fullDimensions = {
    length: 1,
    width: 2,
    height: 3
}
const fullDimensionsExpected = {
    ...fullDimensions,
    unit: 'cm'
}

const expectedResults: any[][] = [
    [undefined, undefined],
    [undefinedDimensions, undefined],
    [zeroDimensions, undefined],
    [minimumDimensions, minimumDimensionsExpected],
    [fullDimensions, fullDimensionsExpected]
]
describe('Dimensions', () => {
    describe('Mapping Dimensions', () => {
        test.each(expectedResults)('mapDimensionsCM(%o) maps to %s', (dimensions, expected) => {
            expect(mapDimensionsCM(dimensions)).toEqual(expected);
        });
    });
})