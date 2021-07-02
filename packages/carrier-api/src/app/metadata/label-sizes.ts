import Joi from 'joi';

export enum LabelSizesEnum {
  Inches4x6 = 'Inches4x6',
  Inches4x8 = 'Inches4x8',
}

export const LabelSizesEnumSchema = Joi.string().valid(
  ...Object.values(LabelSizesEnum),
);
