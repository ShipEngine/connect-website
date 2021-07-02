import Joi from 'joi';

export enum LabelFormatsEnum {
  PDF = 'PDF',
  ZPL = 'ZPL',
  PNG = 'PNG',
}

export const LabelFormatsEnumSchema = Joi.string().valid(
  ...Object.values(LabelFormatsEnum),
);
