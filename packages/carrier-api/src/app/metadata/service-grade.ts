import Joi from 'joi';

/** @description Common shipping service grades */
export enum ServiceGradeEnum {
  Unspecified = 'Unspecified',
  Economy = 'Economy',
  Expedited = 'Expedited',
  Overnight = 'Overnight',
  Standard = 'Standard',
}

export const ServiceGradeEnumSchema = Joi.string().valid(
  ...Object.values(ServiceGradeEnum),
);
