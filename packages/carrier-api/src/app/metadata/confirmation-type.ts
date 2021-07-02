import Joi from 'joi';

export interface ConfirmationType {
  Name?: string;
  Type?: ConfirmationTypeEnum;
}

export type ConfirmationDictionary = {
  [Key in ConfirmationTypeEnum]?: string | undefined;
};

export const ConfirmationDictionarySchema = Joi.object({
  None: Joi.string().optional(),
  Delivery: Joi.string().optional(),
  Signature: Joi.string().optional(),
  AdultSignature: Joi.string().optional(),
  DirectSignature: Joi.string().optional(),
});

export enum ConfirmationTypeEnum {
  None = 'None',
  Delivery = 'Delivery',
  Signature = 'Signature',
  AdultSignature = 'AdultSignature',
  DirectSignature = 'DirectSignature',
}

export const ConfirmationTypeEnumSchema = Joi.string().valid(
  ...Object.values(ConfirmationTypeEnum),
);

export const ConfirmationTypeSchema = Joi.object({
  Name: Joi.string().optional(),
  Type: ConfirmationTypeEnumSchema.optional(),
});
