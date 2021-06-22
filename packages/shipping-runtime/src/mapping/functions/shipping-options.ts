import { AdvancedOptions } from '@shipengine/connect-carrier-api/lib/models';
import { ShippingOptions } from '@shipengine/connect-sdk';
export const mapShippingOptions = (
  capiOptions?: AdvancedOptions,
): ShippingOptions => {
  const dxOptions: ShippingOptions = {
    dangerousGoodsCategory: capiOptions?.dangerous_goods_category,
    billDutiesToSender: capiOptions?.bill_duties_to_sender,
  };
  return dxOptions;
};
