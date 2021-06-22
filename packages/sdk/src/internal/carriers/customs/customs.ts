import {
  CustomsPOJO,
  Customs as ICustoms,
  NonDeliveryOption,
} from '../../../public';
import { hideAndFreeze, Joi, MonetaryValue, _internal } from '../../common';
import { CustomsItem } from './customs-item';

export class Customs implements ICustoms {
  public static readonly [_internal] = {
    label: 'customs',
    schema: Joi.object({
      nonDeliveryOption: Joi.string().enum(NonDeliveryOption),
      contents: Joi.array().items(CustomsItem[_internal].schema),
      buyerShippingAmountPaid: MonetaryValue[_internal].schema,
      dutiesPaid: MonetaryValue[_internal].schema,
    }),
  };

  public readonly nonDeliveryOption?: NonDeliveryOption;
  public readonly contents: readonly CustomsItem[];
  public readonly buyerShippingAmountPaid?: MonetaryValue;
  public readonly dutiesPaid?: MonetaryValue;

  public constructor(pojo: CustomsPOJO) {
    this.nonDeliveryOption = pojo.nonDeliveryOption;
    this.contents = pojo.contents
      ? pojo.contents.map((item) => new CustomsItem(item))
      : [];
    this.buyerShippingAmountPaid = pojo.buyerShippingAmountPaid
      ? new MonetaryValue(pojo.buyerShippingAmountPaid)
      : undefined;
    this.dutiesPaid = pojo.dutiesPaid
      ? new MonetaryValue(pojo.dutiesPaid)
      : undefined;
    // Make this object immutable
    hideAndFreeze(this);
  }
}
