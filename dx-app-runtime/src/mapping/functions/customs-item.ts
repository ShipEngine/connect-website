import { CustomsItem } from '@ipaas/capi/models';
import {
  CustomsItemPOJO,
  CustomsItemType,
} from '@shipengine/integration-platform-sdk';
import { capiToDxQuantity } from './quantity';

const capiToDxCustomsItem = (customsItem: CustomsItem): CustomsItemPOJO => {
  const dxCustomsItem: CustomsItemPOJO = {
    description: customsItem?.description ?? '',
    harmonizedTariffCode: customsItem?.harmonized_tariff_code ?? '',
    quantity: capiToDxQuantity(customsItem.quantity),
    type: CustomsItemType.Other, //TODO: CAPI does not have customs item type
    unitValue: {
      currency: customsItem?.value?.currency || 'USD',
      value: customsItem?.value?.amount || '0.00',
    },
    sku: customsItem?.sku || '',
  };
  return dxCustomsItem;
};

export { capiToDxCustomsItem };
