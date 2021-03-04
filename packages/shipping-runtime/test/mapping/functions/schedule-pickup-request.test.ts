import { AddressResidentialIndicator } from '@ipaas/capi/models';
import { SchedulePickupRequest } from '@ipaas/capi/requests';
import { mapSchedulePickupRequest } from '../../../src/mapping/functions';

const minimalRequest = {
	transaction_id: 'id',
	requested_pickup_window: {
		pickup_date: '2020-01-25T01:00:00Z',
		start_time: '2020-01-25T01:00:00Z',
		end_time: '2020-01-25T01:00:00Z',
		time_zone_iana: 'America/Chicago',
	}
};

const fullSchedulePickupRequest = {
	transaction_id: '4008bc7b-6ffb-42ac-b987-15a85751e178',
	metadata: {},
	location: {
		pickup_address: {
			name: 'John Doe',
			first_name: 'John',
			last_name: 'Doe',
			email: 'email@email.com',
			phone_number: '555-555-5555',
			company_name: 'Shipstation',
			address_lines: ['800 N Lamar Blvd', '#220'],
			city_locality: 'Austin',
			state_province: 'TX',
			postal_code: '78756',
			country_code: 'US',
			address_residential_indicator: AddressResidentialIndicator.Yes,
			is_eu: false,
		},
		location_notes: 'Kendra Scott building, second floor. Parking Validated.',
		pickup_options: {},
	},
	contact: {
		first_name: 'Jane',
		last_name: 'Doe',
		email: 'jdoe@email.com',
		phone_number: '555-666-5555',
		phone_number_extension: '',
	},
	pickup_details: {
		pickup_service_code: '',
		shipments: [
			{
				tracking_number: 'cd03c247-8d06-4f08-925b-2f0d2b5dff49',
				alternative_identifiers: [],
				service_code: '03',
				packages: [
					{
						tracking_number: 'cd03c247-8d06-4f08-925b-2f0d2b5dff49',
						alternative_identifiers: [],
						dimensions: {
							length: 5,
							width: 6,
							height: 10,
						},
						package_code: '01',
						weight: 50000,
					},
					{
						tracking_number: 'cd03c247-8d06-4f08-925b-2f0d2b5dff49',
						alternative_identifiers: [],
						dimensions: {
							length: 5,
							width: 6,
							height: 10,
						},
						package_code: '01',
						weight: 80000,
					},
				],
				advanced_options: {},
			},
			{
				tracking_number: 'eae6d3bc-f9dd-4237-aa04-53452791107b',
				alternative_identifiers: [],
				service_code: '04',
				packages: [
					{
						tracking_number: 'eae6d3bc-f9dd-4237-aa04-53452791107b',
						alternative_identifiers: [],
						dimensions: {
							length: 5,
							width: 6,
							height: 10,
						},
						package_code: '01',
						weight: 50000,
					},
					{
						tracking_number: 'eae6d3bc-f9dd-4237-aa04-53452791107b',
						alternative_identifiers: [],
						dimensions: {
							length: 5,
							width: 6,
							height: 10,
						},
						package_code: '01',
						weight: 10000,
					},
					{
						tracking_number: 'eae6d3bc-f9dd-4237-aa04-53452791107b',
						alternative_identifiers: [],
						dimensions: {
							length: 5,
							width: 6,
							height: 10,
						},
						package_code: '01',
						weight: 10000,
					},
				],
				advanced_options: {},
			},
			{
				tracking_number: 'eae6d3bc-f9dd-4237-aa04-53452791107b',
				alternative_identifiers: [],
				service_code: '03',
				packages: [
					{
						tracking_number: 'eae6d3bc-f9dd-4237-aa04-53452791107b',
						alternative_identifiers: [],
						dimensions: {
							length: 5,
							width: 6,
							height: 10,
						},
						package_code: '01',
						weight: 50000,
					},
					{
						tracking_number: 'eae6d3bc-f9dd-4237-aa04-53452791107b',
						alternative_identifiers: [],
						dimensions: {
							length: 5,
							width: 6,
							height: 10,
						},
						package_code: '01',
						weight: 10000,
					},
					{
						tracking_number: 'eae6d3bc-f9dd-4237-aa04-53452791107b',
						alternative_identifiers: [],
						dimensions: {
							length: 5,
							width: 6,
							height: 10,
						},
						package_code: '01',
						weight: 10000,
					},
				],
				advanced_options: {},
			},
		],
	},
	requested_pickup_window: {
		time_zone_iana: 'America/Chicago',
		pickup_date: '2019-10-11T21:21:46.261Z',
		start_time: '2019-10-11T21:21:46.261Z',
		end_time: '2019-10-11T21:21:46.261Z',
	},
};

const fullSchedulePickupExpectedMapping = {
	address: {
		addressLines: ['800 N Lamar Blvd', '#220'],
		cityLocality: 'Austin',
		company: 'Shipstation',
		country: 'US',
		isResidential: true,
		postalCode: '78756',
		stateProvince: 'TX',
	},
	contact: {
		email: 'jdoe@email.com',
		name: 'Jane Doe',
		phoneNumber: '555-666-5555',
	},
	notes: [
		{
			text: 'Kendra Scott building, second floor. Parking Validated.',
			type: 'internal',
		},
	],
	pickupService: '',
	shipments: [
		{
			deliveryService: '03',
			packages: [
				{
					dimensions: {
						height: 10,
						length: 5,
						unit: 'cm',
						width: 6,
					},
					identifiers: undefined,
					packaging: '01',
					trackingNumber: 'cd03c247-8d06-4f08-925b-2f0d2b5dff49',
					weight: {
						unit: 'g',
						value: 50000,
					},
				},
				{
					dimensions: {
						height: 10,
						length: 5,
						unit: 'cm',
						width: 6,
					},
					identifiers: undefined,
					packaging: '01',
					trackingNumber: 'cd03c247-8d06-4f08-925b-2f0d2b5dff49',
					weight: {
						unit: 'g',
						value: 80000,
					},
				},
			],
			trackingNumber: 'cd03c247-8d06-4f08-925b-2f0d2b5dff49',
		},
		{
			deliveryService: '04',
			packages: [
				{
					dimensions: {
						height: 10,
						length: 5,
						unit: 'cm',
						width: 6,
					},
					identifiers: undefined,
					packaging: '01',
					trackingNumber: 'eae6d3bc-f9dd-4237-aa04-53452791107b',
					weight: {
						unit: 'g',
						value: 50000,
					},
				},
				{
					dimensions: {
						height: 10,
						length: 5,
						unit: 'cm',
						width: 6,
					},
					identifiers: undefined,
					packaging: '01',
					trackingNumber: 'eae6d3bc-f9dd-4237-aa04-53452791107b',
					weight: {
						unit: 'g',
						value: 10000,
					},
				},
				{
					dimensions: {
						height: 10,
						length: 5,
						unit: 'cm',
						width: 6,
					},
					identifiers: undefined,
					packaging: '01',
					trackingNumber: 'eae6d3bc-f9dd-4237-aa04-53452791107b',
					weight: {
						unit: 'g',
						value: 10000,
					},
				},
			],
			trackingNumber: 'eae6d3bc-f9dd-4237-aa04-53452791107b',
		},
		{
			deliveryService: '03',
			packages: [
				{
					dimensions: {
						height: 10,
						length: 5,
						unit: 'cm',
						width: 6,
					},
					identifiers: undefined,
					packaging: '01',
					trackingNumber: 'eae6d3bc-f9dd-4237-aa04-53452791107b',
					weight: {
						unit: 'g',
						value: 50000,
					},
				},
				{
					dimensions: {
						height: 10,
						length: 5,
						unit: 'cm',
						width: 6,
					},
					identifiers: undefined,
					packaging: '01',
					trackingNumber: 'eae6d3bc-f9dd-4237-aa04-53452791107b',
					weight: {
						unit: 'g',
						value: 10000,
					},
				},
				{
					dimensions: {
						height: 10,
						length: 5,
						unit: 'cm',
						width: 6,
					},
					identifiers: undefined,
					packaging: '01',
					trackingNumber: 'eae6d3bc-f9dd-4237-aa04-53452791107b',
					weight: {
						unit: 'g',
						value: 10000,
					},
				},
			],
			trackingNumber: 'eae6d3bc-f9dd-4237-aa04-53452791107b',
		},
	],
	timeWindow: {
		endDateTime: {
			timeZone: 'America/Chicago',
			value: '2019-10-11T21:21:46',
		},
		startDateTime: {
			timeZone: 'America/Chicago',
			value: '2019-10-11T21:21:46',
		},
	},
};

describe('Schedule Pickup Request', () => {
	it('when a pickup service is defined it maps correctly', () =>
		expect(
			mapSchedulePickupRequest({
				...minimalRequest,
				pickup_details: { pickup_service_code: 'service code' },
			}).pickupService,
		).toEqual('service code'));
	it('when a pickup service is not defined it maps to an empty string', () =>
		expect(
			mapSchedulePickupRequest({
				...minimalRequest,
				pickup_details: { pickup_service_code: undefined },
			}).pickupService,
		).toEqual(''));
	it('when a there are no pickup_details pickupService maps to an empty string', () =>
		expect(
			mapSchedulePickupRequest({ ...minimalRequest }).pickupService,
		).toEqual(''));
	it('when we have a fully formed schedule pickup request it maps correctly', () =>
		expect(mapSchedulePickupRequest(fullSchedulePickupRequest)).toEqual(
			fullSchedulePickupExpectedMapping,
		));
});
