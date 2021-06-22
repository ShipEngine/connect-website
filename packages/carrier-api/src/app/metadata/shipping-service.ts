import { ConfirmationType } from './confirmation-type';
import { CountryAssociation } from './country-association';
import { ServiceAttributesEnum } from './services-attributes';
import { LabelSizesEnum } from './label-sizes';
import { ServiceClassEnum } from './service-class';
import { ServiceGradeEnum } from './service-grade';
import { ServiceRequiredPropertiesEnum } from './service-required-properties';

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
