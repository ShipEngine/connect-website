import { QuantityPOJO } from '@shipengine/connect-sdk';

const capiToDxQuantity = (
  quantity: number | null | undefined
): QuantityPOJO => {
  return {
    value: quantity ?? 0,
  };
};

export { capiToDxQuantity };
