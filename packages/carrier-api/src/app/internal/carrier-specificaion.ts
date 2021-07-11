import { Carrier } from '../metadata/carrier';
import { AccountModals } from '../metadata/account-modals';
import { PackageType } from '../metadata/package-type';
import { ShippingService } from '../metadata/shipping-service';
import {
  ShippingOption,
  ShippingOptionDescription,
  ShippingOptionDictionary,
  ShippingOptionEnum,
} from '../metadata/shipping-option';
import { CountryAssociation } from '../metadata/country-association';
import {
  ConfirmationDictionary,
  ConfirmationType,
  ConfirmationTypeEnum,
} from '../metadata/confirmation-type';
import { LabelFormatsEnum } from '../metadata/label-formats';
import { LabelSizesEnum } from '../metadata/label-sizes';
import { CarrierAttributeEnum } from '../metadata/carrier-attributes';

export const mapShippingOptions = (
  options?: ShippingOptionDictionary,
): ShippingOption[] | undefined => {
  if (!options) {
    return undefined;
  }
  const ret: ShippingOption[] = [];
  Object.keys(options).forEach((key: string) => {
    const Type = key as ShippingOptionEnum;
    const { Name, Description } = options[Type] as ShippingOptionDescription;
    ret.push({
      Name,
      Description,
      Type,
    });
  });
  return ret;
};

export const mapConfirmationTypes = (
  types?: ConfirmationDictionary,
): ConfirmationType[] => {
  if (!types) {
    return [];
  }
  const ret: ConfirmationType[] = [];
  Object.keys(types).forEach((key: any) => {
    const confirmations = types as ConfirmationDictionary;
    const Type = key as ConfirmationTypeEnum;
    const Name = confirmations[Type] as string;
    ret.push({
      Name,
      Type,
    });
  });
  return ret;
};

/** @description This represents what we send to data manager */
export class CarrierSpecification {
  Id: string;
  Name: string;
  AccountModals: AccountModals;
  PackageTypes?: PackageType[];
  ShippingServices?: ShippingService[];
  ShippingOptions?: ShippingOption[];
  DefaultSupportedCountries?: CountryAssociation[];
  DefaultLabelSizes?: LabelSizesEnum[];
  LabelFormats?: LabelFormatsEnum[];
  DefaultConfirmationTypes: ConfirmationType[];
  CarrierAttributes?: CarrierAttributeEnum[];
  TrackingUrl?: string;
  CarrierUrl?: string;
  Description?: string;
  Images: {
    LogoUrl: string;
    IconUrl: string;
  };

  constructor(definition: Carrier) {
    this.Images = {
      LogoUrl: definition.Images.Logo,
      IconUrl: definition.Images.Icon,
    };
    this.Id = definition.Id;
    this.Name = definition.Name;
    this.AccountModals = definition.AccountModals;
    this.PackageTypes = definition.PackageTypes;
    this.ShippingServices = definition.ShippingServices;
    this.ShippingOptions = mapShippingOptions(definition.ShippingOptions);
    this.DefaultSupportedCountries = definition.DefaultSupportedCountries;
    this.DefaultLabelSizes = definition.DefaultLabelSizes;
    this.LabelFormats = definition.LabelFormats;
    this.DefaultConfirmationTypes = mapConfirmationTypes(
      definition.DefaultConfirmationTypes,
    );
    this.CarrierAttributes = definition.CarrierAttributes;
    this.TrackingUrl = definition.TrackingUrl;
    this.CarrierUrl = definition.CarrierUrl;
    this.Description = definition.Description;
  }
}
