import { PickupWindow } from '@ipaas/capi';
import { mapTimeWindow } from '../../../src/mapping/functions';

const fullPickupWindow: PickupWindow = {
	pickup_date: '2020-12-25T01:00:00.000Z',
	start_time: '2020-12-25T01:00:00.000Z',
	end_time: '2020-12-25T01:00:00.000Z',
	time_zone_iana: 'America/Chicago',
};

const fullExpected = {
	endDateTime: {
		timeZone: 'America/Chicago',
		value: '2020-12-25T01:00:00',
	},
	startDateTime: {
		timeZone: 'America/Chicago',
		value: '2020-12-25T01:00:00',
	},
};

const expectedResults: any[][] = [
	[undefined, { endDateTime: undefined, startDateTime: undefined }],
	[{}, { endDateTime: undefined, startDateTime: undefined }],
	[fullPickupWindow, fullExpected],
];
describe('Time Window', () => {
	describe('Mapping TimeWindow', () => {
		test.each(expectedResults)(
			'mapTimeWindow(%o) maps to %o',
			(window, expected) => {
				expect(mapTimeWindow(window)).toEqual(expected);
			},
		);
	});
});
