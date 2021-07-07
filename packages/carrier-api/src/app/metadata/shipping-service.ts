import { ConfirmationType, ConfirmationTypeSchema } from './confirmation-type';
import {
  CountryAssociation,
  CountryAssociationSchema,
} from './country-association';
import {
  ServiceAttributesEnum,
  ServiceAttributesEnumSchema,
} from './services-attributes';
import { LabelSizesEnum, LabelSizesEnumSchema } from './label-sizes';
import { ServiceClassEnum, ServiceClassEnumSchema } from './service-class';
import { ServiceGradeEnum, ServiceGradeEnumSchema } from './service-grade';
import {
  ServiceRequiredPropertiesEnum,
  ServiceRequiredPropertiesEnumSchema,
} from './service-required-properties';
import Joi from 'joi';

/** @description Basic structure for each shipping service */
export interface ShippingService {
  ConfirmationTypes?: ConfirmationType[];
  ServiceAttributes?: ServiceAttributesEnum[];
  SupportedCountries?: CountryAssociation[];
  SupportedLabelSizes?: LabelSizesEnum[];
  RequiredProperties?: ServiceRequiredPropertiesEnum[];
  Grade?: ServiceGradeEnum;
  Class?: ServiceClassEnum;
  LabelCode?: string;
  International?: boolean;
  Code: string;
  Abbreviation?: string;
  Name: string;
  Id: string;
}

export const ShippingServiceSchema = Joi.object({
  ConfirmationTypes: Joi.array()
    .optional()
    .items(ConfirmationTypeSchema)
    .unique('Type'),
  ServiceAttributes: Joi.array().items(ServiceAttributesEnumSchema).optional(),
  SupportedCountries: Joi.array()
    .optional()
    .items(CountryAssociationSchema)
    .unique('FromCountry'),
  SupportedLabelSizes: Joi.array()
    .optional()
    .items(LabelSizesEnumSchema)
    .unique(),
  RequiredProperties: Joi.array()
    .optional()
    .items(ServiceRequiredPropertiesEnumSchema)
    .unique(),
  Grade: ServiceGradeEnumSchema.optional(),
  Class: ServiceClassEnumSchema.optional(),
  LabelCode: Joi.string().optional(),
  International: Joi.boolean().strict().optional(),
  Code: Joi.string().required(),
  Abbreviation: Joi.string().optional(),
  Name: Joi.string().required(),
  Id: Joi.string()
    .uuid({ version: ['uuidv4'] })
    .required(),
});
