import { CustomsItem as CapiCustomsItem } from '@ipaas/capi/models';
import {
  CustomsItemType,
  CustomsItem,
  Country
} from '@shipengine/connect-sdk';
import { mapQuantity, mapCurrency } from './';

const defaultUnitValue = {
  value: 0,
  currency: ''
}

export const mapCustomsItem = (customsItem: CapiCustomsItem | undefined): CustomsItem => {
  const dxCustomsItem: CustomsItem = {
    description: customsItem?.description || '',
    harmonizedTariffCode: customsItem?.harmonized_tariff_code || '',
    quantity: mapQuantity(customsItem?.quantity),
    type: CustomsItemType.Other, // TODO: CAPI does not have customs item type
    unitValue: mapCurrency(customsItem?.value) || defaultUnitValue,
    sku: customsItem?.sku || '',
    countryOfOrigin: customsItem?.country_of_origin as Country,
    countryOfManufacture: undefined, // TODO: CAPI does not have this supported
  };
  return dxCustomsItem;
};
