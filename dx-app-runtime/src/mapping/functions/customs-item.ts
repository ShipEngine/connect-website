import { CustomsItem as CapiCustomsItem } from '@ipaas/capi/models';
import {
  CustomsItemType,
  CustomsItem
} from '@shipengine/connect-sdk';
import { capiToDxQuantity } from './quantity';

const capiToDxCustomsItem = (customsItem: CapiCustomsItem): CustomsItem => {
  const dxCustomsItem: CustomsItem = {
    description: customsItem?.description || '',
    harmonizedTariffCode: customsItem?.harmonized_tariff_code || '',
    quantity: capiToDxQuantity(customsItem.quantity || 1),
    type: CustomsItemType.Other, //TODO: CAPI does not have customs item type
    unitValue: {
      currency: customsItem?.value?.currency || 'USD',
      value: Number(customsItem?.value?.amount || '0'),
    },
    sku: customsItem?.sku || '',
  };
  return dxCustomsItem;
};

export { capiToDxCustomsItem };
