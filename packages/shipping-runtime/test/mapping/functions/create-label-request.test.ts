import { LabelFormats, LabelLayouts } from '@shipengine/connect-carrier-api/lib/models';
import { CreateLabelRequest } from '@shipengine/connect-carrier-api/lib/requests';
import {
	mapCreateLabelRequest,
	getReturnToAddress,
} from '../../../src/mapping/functions';

const shipTime = new Date();

const labelRequest: any = {
	service_code: 'service_code',
	is_residential: true,
	is_test_label: false,
	is_return_label: false,
	label_format: LabelFormats.Pdf,
	label_layout: LabelLayouts.Letter,
	packages: [
		{
			insured_value: {
				amount: '202.22',
			},
		},
	],
	ship_datetime: shipTime.toISOString(),
	transaction_id: 'guid',
	ship_from: {
		country_code: 'US',
		postal_code: '78752',
	},
	ship_to: {
		country_code: 'UK',
		postal_code: 'UK-1243',
	},
	ship_from_display: {
		country_code: 'MX',
		postal_code: 'MX-1234',
	},
};

const minimalAddress = {
	addressLines: [],
	cityLocality: '',
	company: '',
	country: '',
	email: '',
	isResidential: undefined,
	name: '',
	phoneNumber: '',
	postalCode: '',
	stateProvince: '',
};

const shipFromAddress = {
	...minimalAddress,
	country: labelRequest.ship_from?.country_code,
	postalCode: labelRequest.ship_from?.postal_code,
};

const shipFromDisplayAddress = {
	...minimalAddress,
	country: labelRequest.ship_from_display?.country_code,
	postalCode: labelRequest.ship_from_display?.postal_code,
};

const expectedReturnAddress: any[][] = [
	[undefined, undefined, undefined, undefined],
	[false, undefined, undefined, undefined],
	[false, labelRequest.ship_from, labelRequest.ship_from_display, undefined],
	[true, undefined, undefined, undefined],
	[true, labelRequest.ship_from, undefined, shipFromAddress],
	[
		true,
		labelRequest.ship_from,
		labelRequest.ship_from_display,
		shipFromDisplayAddress,
	],
];

describe('Create Label Request', () => {
	describe('delivery services', () => {
		it('when the service_code is undefined it maps deliveryService to an empty string', () =>
			expect(
				mapCreateLabelRequest({ ...labelRequest, service_code: undefined })
					.deliveryService,
			).toEqual(''));
		it('when the service_code is defined it maps correctly to deliveryService', () =>
			expect(mapCreateLabelRequest(labelRequest).deliveryService).toEqual(
				'service_code',
			));
	});
	describe('return address is mapped correctly', () => {
		test.each(expectedReturnAddress)(
			'getReturnToAddress(%s, %o, %o) returns %o',
			(isReturn, from, display, expected) => {
				expect(getReturnToAddress(isReturn, from, display)).toEqual(expected);
			},
		);
	});
});
