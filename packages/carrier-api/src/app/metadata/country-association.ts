import Joi from 'joi';

/** @description Country code association with an alternate service name */
export interface CountryAssociation {
  FromCountry: string;
  AlternateServiceName?: string;
}

export const CountryAssociationSchema = Joi.object({
  FromCountry: Joi.string()
    .required()
    .length(2)
    .message('FromCountry must be the ISO Alpha-2 country code'),
  AlternateServiceName: Joi.string().optional(),
});
