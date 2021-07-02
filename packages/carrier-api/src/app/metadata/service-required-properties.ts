import Joi from 'joi';

/** @description Properties that may be required */
export enum ServiceRequiredPropertiesEnum {
  Weight = 'Weight',
  Dimensions = 'Dimensions',
}

export const ServiceRequiredPropertiesEnumSchema = Joi.string().valid(
  ...Object.values(ServiceRequiredPropertiesEnum),
);
