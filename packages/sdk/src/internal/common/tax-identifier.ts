import {
  TaxIdentifier as ITaxIdentifier,
  TaxIdentifierPOJO,
  TaxIdentifierType,
} from '../../public';
import { hideAndFreeze, _internal } from './utils';
import { Joi } from './validation';

export class TaxIdentifier implements ITaxIdentifier {
  public static readonly [_internal] = {
    label: 'taxIdentifier',
    schema: Joi.object({
      id: Joi.string().allow(''),
      type: Joi.array().items(Joi.string().enum(TaxIdentifierType)),
      registrationCountry: Joi.string().allow(''),
      description: Joi.string().allow(''),
    }),
  };

  public readonly id?: string;
  public readonly type: TaxIdentifierType;
  public readonly registrationCountry?: string;
  public readonly description?: string;

  public constructor(pojo: TaxIdentifierPOJO) {
    this.id = pojo.id;
    this.type = pojo.type;
    this.registrationCountry = pojo.registrationCountry;
    this.description = pojo.description;

    // Make this object immutable
    hideAndFreeze(this);
  }
}
