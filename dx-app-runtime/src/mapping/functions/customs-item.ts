import { CustomsItem } from '@ipaas/capi/models';
import {
  CustomsItemPOJO,
  CustomsItemType,
} from '@shipengine/integration-platform-sdk';
import { capiToDxMonetaryValue } from './currency';
import { capiToDxQuantity } from './quantity';

const capiToDxCustomsItem = (customsItem: CustomsItem): CustomsItemPOJO => {
  const dxCustomsItem: CustomsItemPOJO = {
    description: customsItem.description ?? '',
    harmonizedTariffCode: customsItem.harmonized_tariff_code ?? '',

    quantity: capiToDxQuantity(customsItem.quantity),
    type: CustomsItemType.Other, //TODO: CAPI does not have customs item type
    unitValue: capiToDxMonetaryValue(customsItem?.value),
    sku: customsItem?.sku || '',
  };
  return dxCustomsItem;
};

export { capiToDxCustomsItem };
