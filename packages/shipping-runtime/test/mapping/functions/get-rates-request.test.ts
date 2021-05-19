import {
	mapGetRatesRequest,
	mapRatePackage,
} from '../../../src/mapping/functions';
import {
	AddressResidentialIndicator,
	ConfirmationTypes,
	DimensionUnit,
	InsuranceProviders,
	Package,
	WeightUnit,
} from '@shipengine/connect-carrier-api/lib/models';
import {
	GetRatesRequest,
} from '@shipengine/connect-carrier-api/lib/requests';


const fullPackage: Package = {
	package_code: 'Package',
	weight_details: {
		weight_in_ounces: 0.3584,
		weight_in_grams: 10.16,
		source_weight: 10.16,
		source_weight_unit: WeightUnit.Grams,
	},
	dimension_details: {
		dimensions_in_centimeters: {
			length: 254,
			width: 254,
			height: 254,
		},
		dimensions_in_inches: {
			length: 100,
			width: 100,
			height: 100,
		},
		source_dimensions: {
			length: 100,
			width: 100,
			height: 100,
		},
		source_dimension_unit: DimensionUnit.Inches,
	},
	insured_value: {
		currency: 'USD',
		amount: '16.00',
	},
};

const fullRateRequest: GetRatesRequest = {
	service_code: 'string',
	ship_datetime: '2019-12-06T02:02:56Z',
	confirmation: ConfirmationTypes.None,
	insurance_provider: InsuranceProviders.Carrier,
	advanced_options: {
		contains_alcohol: true,
		no_postage: true,
		nonmachineable: true,
		bill_duties_to_sender: true,
		saturday_delivery: true,
	},
	is_return_label: false,
	is_residential: false,
	packages: [fullPackage],
	customs: undefined,
	ship_to: {
		name: 'ShipStation',
		first_name: 'Ship',
		last_name: 'Station',
		email: 'some@email.com',
		phone_number: '1234567890',
		company_name: 'ShipStation',
		address_lines: ['3800 N Lamar Blvd #220'],
		city_locality: 'Austin',
		state_province: 'Tx',
		postal_code: '78756',
		country_code: 'US',
		address_residential_indicator: AddressResidentialIndicator.Unknown,
	},
	ship_from: {
		name: 'Shipping Easy',
		first_name: 'Ship',
		last_name: 'EZ',
		email: 'some@email.com',
		phone_number: '1234567890',
		company_name: 'ShippingEZ',
		address_lines: ['3700 N Capital of Texas Hwy Suite 550'],
		city_locality: 'Austin',
		state_province: 'Tx',
		postal_code: '78746',
		country_code: 'US',
		address_residential_indicator: AddressResidentialIndicator.Unknown,
	},
	international: false,
	next_day: false,
	transaction_id: '26e83391-6015-47b0-90c9-9eacb987bca3',
	metadata: {},
};

describe('Get Rates Request', () => {
	describe('Mapping Rate Package', () => {
		describe('when mapRatePackage is called with all necessary information', () => {
			const result = mapRatePackage(fullPackage, fullRateRequest);
			it('it maps packaging from package_code', () =>
				expect(result.packaging).toEqual(fullPackage.package_code));
			it('it maps containsAlcohol from advanced_options.contains_alcohol', () =>
				expect(result.containsAlcohol).toEqual(
					fullRateRequest.advanced_options?.contains_alcohol,
				));
			it('it maps isNonMachineable from package_code', () =>
				expect(result.isNonMachinable).toEqual(
					fullRateRequest.advanced_options?.nonmachineable,
				));
		});
		describe('when mapRatePackage is called with missing information', () => {
			const result = mapRatePackage(
				{
					...fullPackage,
					package_code: undefined,
					weight_details: undefined,
					dimension_details: undefined,
				},
				{ ...fullRateRequest, advanced_options: undefined },
			);
			it('it maps packaging to an empty string', () =>
				expect(result.packaging).toEqual(''));
			it('it maps containsAlcohol to false', () =>
				expect(result.containsAlcohol).toEqual(false));
			it('it maps isNonMachineable to false', () =>
				expect(result.isNonMachinable).toEqual(false));
		});
	});
	describe('Mapping Get Rates Request', () => {
		describe('when mapGetRatesRequest is called with all necessary information', () => {
			const result = mapGetRatesRequest(fullRateRequest);
			it('it maps deliveryService from service_code', () =>
				expect(result.deliveryService).toEqual(fullRateRequest.service_code));
			it('it maps shipDateTime from ship_datetime', () =>
				expect(result.shipDateTime).toEqual(fullRateRequest.ship_datetime));
			it('it maps isReturns from is_return_label', () =>
				expect(result.returns?.isReturn).toEqual(
					fullRateRequest.is_return_label,
				));
		});
		describe('when mapGetRatesRequest is called with missing information', () => {
			const result = mapGetRatesRequest({
				...fullRateRequest,
				service_code: undefined,
				ship_datetime: '',
				is_return_label: false,
			});
			it('it maps deliveryService to undefined', () =>
				expect(result.deliveryService).toEqual(undefined));
			it('it maps shipDateTime to an empty string', () =>
				expect(result.shipDateTime).toEqual(''));
			it('it maps isReturns to false', () =>
				expect(result.returns?.isReturn).toEqual(false));
		});
	});
});
