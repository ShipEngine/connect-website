import { AddressResidentialIndicator } from '@shipengine/connect-carrier-api/lib/models';
import {
	mapManifestShipments,
	mapCreateManifestRequest,
} from '../../../src/mapping/functions';

describe('Create Manifest Request', () => {
	describe('Mapping Manifest Shipments', () => {
		const result = mapManifestShipments({
			tracking_number: 'trackingNumber',
			carrier_transaction_id: 'carrierTransactionId',
		});
		it('when given a label it maps trackingNumber correctly', () =>
			expect(result.trackingNumber).toEqual('trackingNumber'));
		it('when given a label it maps carrierTransactionId correctly', () =>
			expect(result.identifiers?.carrierTransactionId).toEqual(
				'carrierTransactionId',
			));
	});
	describe('Mapping a Manifest Request', () => {
		describe('when mapping a full create manifest request', () => {
			const result = mapCreateManifestRequest({
				ship_from: {
					is_eu: true,
					address_residential_indicator: AddressResidentialIndicator.Yes,
					country_code: 'US',
					postal_code: '78759',
					state_province: 'TX',
					city_locality: 'Austin',
					address_lines: ['10000 Fumble Blvd.', 'Apt 433'],
					company_name: 'Shipstation',
					phone_number: '555-555-5555',
					email: 'jdoe@email.com',
					last_name: 'Doe',
					first_name: 'Jane',
					name: 'Jane Doe',
				},
				included_labels: [
					{
						tracking_number: '1ZWO3343405309843',
						carrier_transaction_id: 'b82c065b-52ad-49d0-9a8a-3f5f03e89fbc',
					},
					{
						tracking_number: '2ZWO3343405309844',
						carrier_transaction_id: 'ccc32518-b4f9-41bc-8769-ce46c25792ba',
					},
				],
				excluded_labels: [
					{
						tracking_number: '2ZWO3343405309843',
						carrier_transaction_id: '086a86d5-8379-4120-984f-e713691ddbac',
					},
				],
				open_datetime: '2019-12-06T01:27:34Z',
				close_datetime: '2019-12-06T01:27:34Z',
				advanced_options: {
					contains_alcohol: true,
					no_postage: false,
					nonmachineable: false,
					bill_duties_to_sender: false,
					saturday_delivery: false,
				},
				transaction_id: '8061f1f2-6d43-42cc-9b38-7f4c2fab822e',
				metadata: {},
			});

			it('it maps openDateTime correclty', () =>
				expect(result.openDateTime).toEqual('2019-12-06T01:27:34Z'));
			it('it maps closeDateTime correctly', () =>
				expect(result.closeDateTime).toEqual('2019-12-06T01:27:34Z'));
		});
		describe('when mapping a minimal create manifest request without an open date provided', () => {
			const result = mapCreateManifestRequest({
				ship_from: {
					is_eu: true,
					address_residential_indicator: AddressResidentialIndicator.Yes,
					country_code: 'US',
					postal_code: '78759',
					state_province: 'TX',
					city_locality: 'Austin',
					address_lines: ['10000 Fumble Blvd.', 'Apt 433'],
					company_name: 'Shipstation',
					phone_number: '555-555-5555',
					email: 'jdoe@email.com',
					last_name: 'Doe',
					first_name: 'Jane',
					name: 'Jane Doe',
				},
				included_labels: [],
				excluded_labels: [],
				open_datetime: undefined,
				close_datetime: '2019-12-06T01:27:34Z',
				advanced_options: {
					contains_alcohol: true,
					no_postage: false,
					nonmachineable: false,
					bill_duties_to_sender: false,
					saturday_delivery: false,
				},
				transaction_id: '8061f1f2-6d43-42cc-9b38-7f4c2fab822e',
				metadata: {},
			});

			it('it maps openDateTime to a default datetime of January 1st 2000', () =>
				expect(result.openDateTime).toEqual('2000-01-01T01:00:00Z'));
		});
	});
});
