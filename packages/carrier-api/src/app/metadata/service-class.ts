import Joi from 'joi';

/** @description Common shipping service classes */
export enum ServiceClassEnum {
  Unspecified = 'Unspecified',
  Ground = 'Ground',
  OneDay = 'OneDay',
  OneDayEarly = 'OneDayEarly',
  OneDayEarlyAm = 'OneDayEarlyAm',
  TwoDay = 'TwoDay',
  TwoDayEarly = 'TwoDayEarly',
  ThreeDay = 'ThreeDay',
}

export const ServiceClassEnumSchema = Joi.string().valid(
  ...Object.values(ServiceClassEnum),
);
