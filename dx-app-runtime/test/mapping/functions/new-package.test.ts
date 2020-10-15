import { InsuranceProvider, Currency, Package, DimensionUnit, WeightUnit, Customs, NonDelivery, AdvancedShippingOptions } from '@ipaas/capi';
import { DocumentFormat, DocumentSize, NonDeliveryOption } from '@shipengine/connect';
import { mapCustomsPOJO, mapInsuredValue, mapNewLabelPOJO, mapNewPackage, mapNonDeliveryOption, nonEmptyCustomsItemsFilter } from '../../../src/mapping/functions';

const validCurrency: Currency = {
    amount: '200.24',
    currency: 'USD'
}

const invalidCurrency: Currency = {
    amount: '',
}

const capiPackage: Package = {
    dimension_details: {
        dimensions_in_centimeters: {
            length: 254,
            height: 254,
            width: 254
        },
        dimensions_in_inches: {
            length: 100,
            height: 100,
            width: 100
        },
        source_dimension_unit: DimensionUnit.Centimeters,
        source_dimensions: {
            length: 254,
            height: 254,
            width: 254
        }
    },
    dimensions: {
        length: 254,
        height: 254,
        width: 254
    },
    insured_value: validCurrency,
    label_messages: {
        reference1: 'reference 1',
        reference2: 'reference 2',
        reference3: 'reference 3'
    },
    package_code: 'packageCode',
    weight: 200,
    weight_details: {
        weight_in_grams: 200,
        weight_in_ounces: 7.0548,
        source_weight: 200,
        source_weight_unit: WeightUnit.Grams
    }
}

const customs: Customs = {
    contents: 'Contents',
    customs_items: [{
        country_of_origin: 'US',
        description: 'this is the description',
        harmonized_tariff_code: 'harmonization_code',
        quantity: 24,
        sku: 'SKU123',
        sku_description: 'SKU description',
        value: {
            amount: '142.23',
            currency: 'USD'
        }
    }, 
    {
        country_of_origin: 'US',
        description: 'this is the description',
        harmonized_tariff_code: 'harmonization_code',
        quantity: 24,
        sku: 'SKU123',
        sku_description: 'SKU description',
        value: {
            amount: '142.23',
            currency: 'USD'
        }
    }],
    non_delivery: NonDelivery.ReturnToSender
}

const customsWithNoItems: Customs = {
    contents: 'Contents',
    customs_items: [],
    non_delivery: NonDelivery.ReturnToSender
}
const advancedOptions: AdvancedShippingOptions = {
    bill_duties_to_sender: true,
    contains_alcohol: true,
    no_postage: true,
    nonmachineable: true,
    saturday_delivery: true
}

const expectedInsuranceMapping: any[][] = [
    [undefined, undefined, undefined],
    [InsuranceProvider.Carrier, undefined, undefined],
    [InsuranceProvider.Carrier, invalidCurrency, undefined],
    [InsuranceProvider.External, validCurrency, undefined],
    [InsuranceProvider.None, validCurrency, undefined],
    [InsuranceProvider.ShipEngine, validCurrency, undefined],
    [InsuranceProvider.Carrier, validCurrency, { currency: 'USD', value: 200.24 }],
];

const expectedReferenceMapping: any[][] = [
    [{ reference1: 'ref1', reference2: 'ref2', reference3: 'ref3' }, ['ref1', 'ref2', 'ref3']],
    [{ reference1: 'ref1', reference2: 'ref2' }, ['ref1', 'ref2']],
    [{ reference2: 'ref2' }, ['ref2']],
    [{}, undefined],
    [undefined, undefined]
];

const expectedNonDeliveryOptionsMapping: any[][] = [
    [undefined, undefined],
    ['garbage', undefined],
    [NonDelivery.ReturnToSender, NonDeliveryOption.Return],
    [NonDelivery.TreatAsAbandoned, NonDeliveryOption.Abandon]
];


describe('New Package', () => {
    describe('Insured Values Map Correctly', () => {
        test.each(expectedInsuranceMapping)('mapInsuredValue(%s, %s) maps to %s', (insuranceProvider, currency, expected) => {
            expect(mapInsuredValue(insuranceProvider, currency)).toEqual(expected);
        });
    });

    describe('Non Delivery Options Map Properly', () => {
        test.each(expectedNonDeliveryOptionsMapping)('mapNonDeliveryOption(%s) maps to %s', (option, expected) => {
            expect(mapNonDeliveryOption(option)).toEqual(expected);
        });
    })

    describe('New Label Maps Correctly', () => {
        test.each(expectedReferenceMapping)('mapNewLabelPOJO(\'pdf\', \'4x6\', %s) maps to %s', (references, expected) => {
            expect(mapNewLabelPOJO(DocumentFormat.PDF, DocumentSize.Inches4x6, references)).toEqual({
                format: DocumentFormat.PDF,
                size: DocumentSize.Inches4x6,
                referenceFields: expected
            });
        });
    });

    describe('Customs Maps Properly', () => {
        it('it should be undefined when the customs item is undefined.', () => expect(mapCustomsPOJO()).toEqual(undefined));
        it('it should map to undefined if no items are present', () => expect(mapCustomsPOJO(customsWithNoItems)).toEqual(undefined));
        describe('when it has a full customs item', () => {
            const result = mapCustomsPOJO(customs);
            it('it should map non delivery options properly', () => expect(result?.nonDeliveryOption).toEqual('return'));
            it('it should have the proper number of contents', () => expect(result?.contents).toHaveLength(2));
        })
    });

    describe('when we have a fully filled out package', () => {
        const result = mapNewPackage(capiPackage, customs, advancedOptions, DocumentFormat.PDF, DocumentSize.Inches4x6, InsuranceProvider.Carrier);
        it('it maps containsAlcohol correctly', () => expect(result.containsAlcohol).toEqual(true));
        it('it maps nothing to contents because that does not exist in capi', () => expect(result.contents).toEqual(undefined));
        it('it maps isNonMachinable correctly', () => expect(result.isNonMachinable).toEqual(true));
        it('it maps packaging correctly', () => expect(result.packaging).toEqual('packageCode'));
    });

    describe('nonEmptyCustomsItemsFilter', () => {
        it('the filter should return false when the item is undefined', () => expect(nonEmptyCustomsItemsFilter(undefined)).toEqual(false));
        it('the filter should return false when the item is an empty object', () => expect(nonEmptyCustomsItemsFilter({})).toEqual(false));
        it('the filter should return false when quantity is 0', () => expect(nonEmptyCustomsItemsFilter({ quantity: 0 })).toEqual(false));
        it('the filter should return true when description is specified', () => expect(nonEmptyCustomsItemsFilter({ description: 'value' })).toEqual(true));
        it('the filter should return true when harmonized_tariff_code is specified', () => expect(nonEmptyCustomsItemsFilter({ harmonized_tariff_code: 'value' })).toEqual(true));
        it('the filter should return true when quantity is greater than 0', () => expect(nonEmptyCustomsItemsFilter({ quantity: 1 })).toEqual(true));
        it('the filter should return true when sku is specified', () => expect(nonEmptyCustomsItemsFilter({ sku: 'value' })).toEqual(true));
        it('the filter should return true when sku_description is specified', () => expect(nonEmptyCustomsItemsFilter({ sku_description: 'value' })).toEqual(true));
    });
})