import { AccountModals, AccountModalsSchema } from './account-modals';
import { PackageType, PackageTypeSchema } from './package-type';
import { ShippingService, ShippingServiceSchema } from './shipping-service';
import {
  ShippingOptionDictionary,
  ShippingOptionDictionarySchema,
} from './shipping-option';
import {
  CountryAssociation,
  CountryAssociationSchema,
} from './country-association';
import {
  CarrierAttributeEnum,
  CarrierAttributeEnumSchema,
} from './carrier-attributes';
import { LabelFormatsEnum, LabelFormatsEnumSchema } from './label-formats';
import { LabelSizesEnum, LabelSizesEnumSchema } from './label-sizes';
import {
  ConfirmationDictionary,
  ConfirmationDictionarySchema,
} from './confirmation-type';
import { existsSync } from 'fs';
import Joi from 'joi';

/** @description Basic structure for each carrier */
export interface Carrier {
  AccountModals: AccountModals;
  PackageTypes?: PackageType[];
  ShippingServices?: ShippingService[];
  ShippingOptions?: ShippingOptionDictionary;
  DefaultSupportedCountries?: CountryAssociation[];
  DefaultLabelSizes?: LabelSizesEnum[];
  LabelFormats?: LabelFormatsEnum[];
  DefaultConfirmationTypes?: ConfirmationDictionary;
  CarrierAttributes?: CarrierAttributeEnum[];
  TrackingUrl?: string;
  CarrierUrl?: string;
  Description?: string;
  Name: string;
  Id: string;
  Images: {
    Logo: string;
    Icon: string;
  };
}

const fileExists = (value: string, helpers: any) => {
  if (existsSync(value)) {
    return value;
  }
  throw new Error("the file doesn't exist");
};

export const CarrierSchema = Joi.object({
  AccountModals: AccountModalsSchema.required(),
  PackageTypes: Joi.array().optional().items(PackageTypeSchema).unique('Id'),
  ShippingServices: Joi.array()
    .optional()
    .items(ShippingServiceSchema)
    .unique('Id'),
  ShippingOptions: ShippingOptionDictionarySchema.optional(),
  DefaultSupportedCountries: Joi.array()
    .optional()
    .items(CountryAssociationSchema)
    .unique('FromCountry'),
  DefaultLabelSizes: Joi.array()
    .optional()
    .items(LabelSizesEnumSchema)
    .unique(),
  LabelFormats: Joi.array().optional().items(LabelFormatsEnumSchema).unique(),
  DefaultConfirmationTypes: ConfirmationDictionarySchema.optional(),
  CarrierAttributes: Joi.array()
    .optional()
    .items(CarrierAttributeEnumSchema)
    .unique(),
  TrackingUrl: Joi.string().optional().uri(),
  CarrierUrl: Joi.string().optional().uri(),
  Description: Joi.string().optional(),
  Name: Joi.string().required(),
  Id: Joi.string()
    .uuid({ version: ['uuidv4'] })
    .required(),
  Images: Joi.object({
    Icon: Joi.string()
      .required()
      .custom(fileExists, 'icon exists')
      .pattern(new RegExp('^.*.(svg)$'))
      .message('Images.Icon must be a svg file.'),
    Logo: Joi.string()
      .required()
      .custom(fileExists, 'logo exists')
      .pattern(new RegExp('^.*.(svg)$'))
      .message('Images.Logo must be a svg file.'),
  }).required(),
});
