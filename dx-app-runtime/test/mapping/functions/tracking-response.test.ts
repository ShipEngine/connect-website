import {
	mapTrackEvent,
	mapTrackingResponse,
	mapTrackingStatus,
} from '../../../src/mapping/functions';
import {
	TrackingEvent,
	TrackingInfo,
	Transaction,
} from '@shipengine/connect/lib/internal';
import { StandardizedStatusCodes } from '@ipaas/capi';
import { Country, ShipmentStatus } from '@shipengine/connect';

const expectedResults: any[][] = [
	[undefined, StandardizedStatusCodes.Un],
	['garbage', StandardizedStatusCodes.Un],
	[ShipmentStatus.Accepted, StandardizedStatusCodes.AC],
	[ShipmentStatus.Delivered, StandardizedStatusCodes.De],
	[ShipmentStatus.DeliveryAttempted, StandardizedStatusCodes.At],
	[ShipmentStatus.Exception, StandardizedStatusCodes.Ex],
	[ShipmentStatus.InTransit, StandardizedStatusCodes.It],
	[ShipmentStatus.NotYetInSystem, StandardizedStatusCodes.Ny],
	[ShipmentStatus.Unknown, StandardizedStatusCodes.Un],
];

describe('Tracking Response', () => {
	describe('when given a tracking status code', () => {
		test.each(expectedResults)(
			'mapTrackingStatus(%s) maps to %s',
			(status, expected) => {
				expect(mapTrackingStatus(status)).toEqual(expected);
			},
		);
	});

	describe('when given a tracking event', () => {
		const trackingEvent = new TrackingEvent({
			address: {
				addressLines: [],
				cityLocality: 'city',
				company: 'companyName',
				country: Country.UnitedStates,
				postalCode: 'postalCode',
				stateProvince: 'state',
			},
			status: ShipmentStatus.Accepted,
			dateTime: '2020-10-19T11:00:00Z',
			signer: 'Justin Robertson',
		});
		it('maps the fields correctly', () =>
			expect(mapTrackEvent(trackingEvent)).toEqual({
				city: 'city',
				company: 'companyName',
				country: 'US',
				description: '',
				event_code: '',
				event_datetime: '2020-10-19T11:00:00+00:00',
				postal_code: 'postalCode',
				signer: 'Justin Robertson',
				state: 'state',
			}));
	});

	describe('when given a tracking response', () => {
		const trackingInfo: TrackingInfo = ({
			latestEvent: {
				code: 'carrierCode',
				description: 'carrierDescription',
				dateTime: new Date(2020, 1, 1),
			},
			hasError: false,
			trackingNumber: 'trackingNumber',
			events: [],
		} as unknown) as TrackingInfo;
		it('maps the fields correctly', () =>
			expect(
				mapTrackingResponse(trackingInfo, {
					id: 'test',
					session: {},
				} as Transaction<object>),
			).toEqual({
				metadata: {},
				tracking_info: {
					actual_delivery_datetime: undefined,
					carrier_status_code: 'carrierCode',
					carrier_status_description: 'carrierDescription',
					error_description: '',
					events: [],
					last_event: {
						city: undefined,
						company: undefined,
						country: undefined,
						description: 'carrierDescription',
						event_code: 'carrierCode',
						event_datetime: '2020-02-01T06:00:00.000Z',
						postal_code: undefined,
						signer: undefined,
						state: undefined,
					},
					package_count: 0,
					shipped_datetime: undefined,
					shipping_problem: false,
					shipping_problem_code: '',
					shipping_problem_description: '',
					standardized_status_code: 'UN',
					tracking_number: 'trackingNumber',
				},
			}));
	});
});
