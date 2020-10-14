import { mapLocationNotes } from '../../../src/mapping/functions/';

const expectedResults: any[][] = [
    [undefined, undefined],
    ['', undefined],
    ['this is a real note', [{"text": "this is a real note", "type": "internal"}]],
]
describe('Location Notes', () => {
    describe('Mapping Location Notes', () => {
        test.each(expectedResults)('mapLocationNotes(%s) maps to %o', (notes, expected) => {
            expect(mapLocationNotes(notes)).toEqual(expected);
        });
    });
})