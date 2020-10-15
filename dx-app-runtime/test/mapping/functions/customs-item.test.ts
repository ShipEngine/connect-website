import { CustomsItem } from '@ipaas/capi';
import { mapCustomsItem } from '../../../src/mapping/functions/';

const defaultCustomsItem = { "description": "", "harmonizedTariffCode": "", "quantity": { "value": 1 }, "sku": "", "type": "other", "unitValue": { "currency": "USD", "value": 0 } };

const capiCustomsItem: CustomsItem = {
    country_of_origin: 'US',
    description: 'the description',
    harmonized_tariff_code: 'tarrif_code',
    quantity: 1,
    sku: 'sku',
    sku_description: 'sku description',
    value: {
        amount: '20.00',
        currency: 'USD'
    }
};

describe('Customs Items', () => {
    describe('when the customs item is undefined', () => {
        it('it maps to a default customs item', () => expect(mapCustomsItem(undefined)).toEqual(defaultCustomsItem));
    });
    describe('when the customs item is fully formed', () => {
        const mappedCustomsItem = mapCustomsItem(capiCustomsItem);
        it('it maps the country of manufacture to undefined because it is not supported yet.', () => expect(mappedCustomsItem.countryOfManufacture).toBe(undefined));
        it('it maps the country of origin correctly', () => expect(mappedCustomsItem.countryOfOrigin).toBe('US'));
        it('it maps the description correctly', () => expect(mappedCustomsItem.description).toBe('the description'));
        it('it maps the harmonized tarriff code correctly', () => expect(mappedCustomsItem.harmonizedTariffCode).toBe('tarrif_code'));
        it('it maps the sku correctly', () => expect(mappedCustomsItem.sku).toBe('sku'));
        it('it maps the type to other because it is not supported yet', () => expect(mappedCustomsItem.type).toBe('other'));
    });
})