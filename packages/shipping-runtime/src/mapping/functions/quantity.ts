import { QuantityPOJO } from '@shipengine/connect-sdk';

export const mapQuantity = (
  quantity: string | number | null | undefined,
): QuantityPOJO => {
  if (!quantity || isNaN(Number(quantity)) || Number(quantity) === 0) {
    return {
      value: 1,
    };
  }
  return {
    value: Number(quantity),
  };
};
