import {
	ChargeType,
	NoteType,
	Session,
	ShipmentIdentifierPOJO,
} from '@shipengine/connect';
import { PickupConfirmation } from '@shipengine/connect/lib/internal';
import {
	mapIdentifier,
	mapMonetaryValue,
	mapNotes,
	mapSchedulePickupResponse,
} from '../../../src/mapping/functions';

const pickupResponse = new PickupConfirmation({
	id: 'confirmationId',
	charges: [
		{ amount: { currency: 'USD', value: 204 }, type: ChargeType.Pickup },
		{ amount: { currency: 'USD', value: 306 }, type: ChargeType.Pickup },
	],
	timeWindows: [
		{
			startDateTime: '2020-01-25T01:01:30Z',
			endDateTime: '2020-01-25T05:01:30Z',
		},
		{
			startDateTime: '2020-01-26T01:01:30Z',
			endDateTime: '2020-01-26T05:01:30Z',
		},
		{},
	],
	shipments: [{ trackingNumber: 'TRACK1' }, { trackingNumber: 'TRACK2' }],
	notes: [
		{ text: 'note1', type: NoteType.Internal },
		{ text: 'note2', type: NoteType.Internal },
	],
	identifiers: {
		fun: 'fun',
		fun2: 'fun2',
	},
});

const expectedPickupResponse = {
	charges_total: {
		amount: '510',
		currency: 'USD',
	},
	confirmation: {
		confirmation_id: 'confirmationId',
		shipment_identifiers: [
			{
				alternate_identifiers: [],
				tracking_number: 'TRACK1',
			},
			{
				alternate_identifiers: [],
				tracking_number: 'TRACK2',
			},
		],
	},
	metadata: { garbage: 1 },
	pickup_windows: [
		{
			end_time: '2020-01-25T05:01:30+00:00',
			pickup_date: '2020-01-25T01:01:30+00:00',
			start_time: '2020-01-25T01:01:30+00:00',
			time_zone_iana: 'UTC',
		},
		{
			end_time: '2020-01-26T05:01:30+00:00',
			pickup_date: '2020-01-26T01:01:30+00:00',
			start_time: '2020-01-26T01:01:30+00:00',
			time_zone_iana: 'UTC',
		},
	],
	remarks: 'note1, note2',
};

describe('Schedule Pickup Response', () => {
	describe('when given a full schedule pickup response', () => {
		it('it maps correctly', () => {
			const response = mapSchedulePickupResponse(pickupResponse, {
				id: 'transactionId',
				language: 'en-US',
				session: { garbage: 1 } as Session<object>,
			});
			expect(response).toEqual(expectedPickupResponse);
		});
	});

	describe('when given a key and a value pair', () => {
		it('it maps properly with a real value', () =>
			expect(mapIdentifier('key', 'value')).toEqual({
				type: 'key',
				value: 'value',
			}));
		it('it maps properly with an undefined value', () =>
			expect(mapIdentifier('key', undefined)).toEqual({
				type: 'key',
				value: undefined,
			}));
	});

	describe('notes maps properly', () => {
		it('it maps undefined to undefined', () =>
			expect(mapNotes(undefined)).toEqual(undefined));
		it('it mpas an empty array to undefined', () =>
			expect(mapNotes([])).toEqual(undefined));
	});

	describe('monetary value maps properly', () => {
		it('it maps undefined to undefined', () =>
			expect(mapMonetaryValue(undefined)).toEqual(undefined));
	});

	describe('shipment identifier maps properly', () => {
		it('it maps properly when given a full shipmentIdentifier', () => {
			const fullShipmentIdentifier: ShipmentIdentifierPOJO = {
				trackingNumber: 'trackingNumber',
				identifiers: {
					key1: undefined,
					key2: 'value2',
					key3: 'value3',
					undefined: 'value4',
				},
			};
			expect(fullShipmentIdentifier).toEqual({
				identifiers: {
					key1: undefined,
					key2: 'value2',
					key3: 'value3',
					undefined: 'value4',
				},
				trackingNumber: 'trackingNumber',
			});
		});
		it('it maps properly without shipmentIdentifiers', () => {
			const fullShipmentIdentifier: ShipmentIdentifierPOJO = {
				trackingNumber: 'trackingNumber',
				identifiers: undefined,
			};
			expect(fullShipmentIdentifier).toEqual({
				trackingNumber: 'trackingNumber',
			});
		});
	});
});
