import { ChargeType, DocumentFormat, DocumentSize, DocumentType } from '@shipengine/connect';
import { ShipmentConfirmation } from '@shipengine/connect/lib/internal/carriers';
import { Charge } from '@shipengine/connect/lib/internal/common';
import { mapCreateLabelResponse, insuranceChargeFilter, shippingChargeFilter, getTotalCosts, mapDateTime } from '../../../src/mapping/functions';

const insuranceCharges: readonly Charge[] = [
    {
        amount: {
            currency: 'USD',
            value: 244.53
        },
        type: ChargeType.Insurance,
        name: 'Insurance 1'
    },
    {
        amount: {
            currency: 'USD',
            value: 245.3
        },
        type: ChargeType.Insurance,
        name: 'Insurance 2'
    }
]

const otherCharges: readonly Charge[] = [
    {
        amount: {
            currency: 'USD',
            value: 244.53
        },
        type: ChargeType.LocationFee,
        name: 'Location Fee'
    },
    {
        amount: {
            currency: 'USD',
            value: 245.3
        },
        type: ChargeType.Shipping,
        name: 'Shipping'
    },
    {
        amount: {
            currency: 'USD',
            value: 245.3
        },
        type: ChargeType.SpecialGoods,
        name: 'Special Goods'
    },
    {
        amount: {
            currency: 'USD',
            value: 245.3
        },
        type: ChargeType.Tax,
        name: 'Tax'
    }
]

const charges: readonly Charge[] = [...insuranceCharges, ...otherCharges];

const shipmentWithoutForm = new ShipmentConfirmation({
    charges: [],
    trackingNumber: 'TRACK12345',
    packages: [],
    label: {
        type: DocumentType.Label,
        format: DocumentFormat.PDF,
        size: DocumentSize.Inches4x8,
        data: Buffer.from('This is data')
    },
    deliveryDateTime: new Date(Date.now())
});

const shipmentWithForm = new ShipmentConfirmation({
    charges: [],
    trackingNumber: 'TRACK12345',
    packages: [],
    label: {
        type: DocumentType.Label,
        format: DocumentFormat.PDF,
        size: DocumentSize.Inches4x8,
        data: Buffer.from('This is data')
    },
    form: {
        type: DocumentType.ScanForm,
        format: DocumentFormat.PDF,
        size: DocumentSize.Inches4x8,
        data: Buffer.from('This is a scanform')
    },
    deliveryDateTime: new Date(Date.now())
});


describe('Create Label Response', () => {
    describe('when we have a list of charges of various types', () => {
        it('the insurance charge filter only returns a list of charges that have a type of Insurance', () => expect(charges.filter(insuranceChargeFilter)).toEqual(insuranceCharges));
        it('the shipping charge filter returns a list of all charges other than Insurance charges', () => expect(charges.filter(shippingChargeFilter)).toEqual(otherCharges));
        it('the getTotalCosts properly sums and combines the totals into a new Currency type', () => expect(getTotalCosts(charges)).toEqual({ amount: '1470.26', currency: 'USD' }));
        it('the getTotalCharges method should return undefined if the charges array was empty', () => expect(getTotalCosts([])).toEqual(undefined));
        it('the getTotalCharges method should return undefined if the charges array was undefined', () => expect(getTotalCosts(undefined)).toEqual(undefined));
    });

    describe('when we map the Create Label Response with only a label', () => {
        const response = mapCreateLabelResponse({id: 'Id' }, shipmentWithoutForm);
        it('it should map transaction_id correctly', () => expect(response.transaction_id).toEqual('Id'));
        it('it should map tracking_number correctly', () => expect(response.tracking_number).toEqual(shipmentWithoutForm.trackingNumber));
        it('it should map estimated_delivery_datetime correctly', () => expect(response.estimated_delivery_datetime).toEqual(mapDateTime(shipmentWithoutForm.deliveryDateTime)));
        it('it should leave form_download undefined', () => expect(response.form_download).toEqual(undefined));
        it('it should map label_data correctly to a base64 string', () => expect(response.label_download.label_data).toEqual(shipmentWithoutForm.label.data.toString('base64')));
    });

    describe('when we map the Create Label Response with a document', () => {
        const response = mapCreateLabelResponse({id: 'Id' }, shipmentWithForm);
        it('it should map form_data correctly to a base64 string', () => expect(response.form_download?.label_data).toEqual(shipmentWithForm.form?.data?.toString('base64')));
    });
})