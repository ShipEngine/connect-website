import {
	DocumentFormat,
	DocumentSize,
	DocumentType,
} from '@shipengine/connect-sdk';
import { ShipmentConfirmation } from '@shipengine/connect/lib/internal/carriers';
import {
	mapCreateLabelResponse,
	mapDateTime,
} from '../../../src/mapping/functions';

const shipmentWithoutForm = new ShipmentConfirmation({
	charges: [],
	trackingNumber: 'TRACK12345',
	packages: [],
	label: {
		type: DocumentType.Label,
		format: DocumentFormat.PDF,
		size: DocumentSize.Inches4x8,
		data: Buffer.from('This is data'),
	},
	deliveryDateTime: new Date(Date.now()),
});

const shipmentWithForm = new ShipmentConfirmation({
	charges: [],
	trackingNumber: 'TRACK12345',
	packages: [],
	label: {
		type: DocumentType.Label,
		format: DocumentFormat.PDF,
		size: DocumentSize.Inches4x8,
		data: Buffer.from('This is data'),
	},
	form: {
		type: DocumentType.ScanForm,
		format: DocumentFormat.PDF,
		size: DocumentSize.Inches4x8,
		data: Buffer.from('This is a scanform'),
	},
	deliveryDateTime: new Date(Date.now()),
});

describe('Create Label Response', () => {
	describe('when we map the Create Label Response with only a label', () => {
		const response = mapCreateLabelResponse({ id: 'Id', language: 'en-US' }, shipmentWithoutForm);
		it('it should map transaction_id correctly', () =>
			expect(response.transaction_id).toEqual('Id'));
		it('it should map tracking_number correctly', () =>
			expect(response.tracking_number).toEqual(
				shipmentWithoutForm.trackingNumber,
			));
		it('it should map estimated_delivery_datetime correctly', () =>
			expect(response.estimated_delivery_datetime).toEqual(
				mapDateTime(shipmentWithoutForm.deliveryDateTime),
			));
		it('it should leave form_download undefined', () =>
			expect(response.form_download).toEqual(undefined));
		it('it should map data correctly to a base64 string', () =>
			expect(response.label_download?.data).toEqual(
				shipmentWithoutForm.label.data.toString('base64'),
			));
	});

	describe('when we map the Create Label Response with a document', () => {
		const response = mapCreateLabelResponse({ id: 'Id', language: 'en-US' }, shipmentWithForm);
		it('it should map data correctly to a base64 string', () =>
			expect(response.form_download?.data).toEqual(
				shipmentWithForm.form?.data?.toString('base64'),
			));
	});
});
