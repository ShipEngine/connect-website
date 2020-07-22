import {
  QuantityPOJO,
  QuantityUnit,
} from '@shipengine/integration-platform-sdk';

const capiToDxQuantity = (
  quantity: number | null | undefined
): QuantityPOJO => {
  return {
    value: quantity ?? 0,
    unit: QuantityUnit.Each, // TODO: CAPI does not have quantity unit
  };
};

export { capiToDxQuantity };
