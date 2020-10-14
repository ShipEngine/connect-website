import { mapDateTimeZone } from '../../../src/mapping/functions/';

const expectedResults: any[][] = [
    [undefined, undefined, undefined, undefined],
    [undefined, undefined, 'America/Chicago', undefined],
    ['2020-01-25T01:00:00Z', undefined, 'America/Chicago', undefined],
    [undefined, '2020-01-25T01:00:00Z', 'America/Chicago', undefined],
    ['2020-01-25T01:00:00Z', '2020-01-25T01:00:00Z', 'America/Chicago', {"timeZone": "America/Chicago", "value": "2020-01-25T01:00:00"}],
    ['1988-02-15T01:00:00Z', '2020-01-25T01:30:00Z', 'America/Chicago', {"timeZone": "America/Chicago", "value": "1988-02-15T01:30:00"}],
]
describe('DateTimeZone', () => {
    describe('Mapping DateTimeZone', () => {
        test.each(expectedResults)('mapDateTimeZone(%s, %s, %s) maps to %o', (date, time, timezone, expected) => {
            expect(mapDateTimeZone(date, time, timezone)).toEqual(expected);
        });
    });
})