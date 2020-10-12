import { mapDateTime } from '../../../src/mapping/functions/';
import { DateTimeZone } from '@shipengine/connect/lib/internal';

const chicago = new DateTimeZone({
    value: '1988-01-25T13:30:00',
    timeZone: 'America/Chicago'
});

const regularDate = new DateTimeZone(new Date(2020, 1, 1, 10, 40, 20, 0));

const stringDate = new DateTimeZone('1994-11-05T08:15:30Z');

const expectedResults: any[][] = [
    [undefined, undefined],
    [chicago, '1988-01-25T19:30:00.000Z'],
    [regularDate, '2020-02-01T16:40:20.000Z'],
    [stringDate, '1994-11-05T08:15:30.000Z']
]
describe('DateTime', () => {
    describe('Mapping DateTime', () => {
        test.each(expectedResults)('mapDateTime(%s) maps to %s', (date, expected) => {
            expect(mapDateTime(date)).toEqual(expected);
        });
    });
})