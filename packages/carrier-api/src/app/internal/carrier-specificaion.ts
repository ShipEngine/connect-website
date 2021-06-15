import { Carrier } from "../metadata/carrier";
import { AccountModals } from "../metadata/account-modals";
import { PackageType } from "../metadata/package-type";
import { ShippingService } from "../metadata/shipping-service";
import {
  ShippingOption,
  ShippingOptionDictionary,
  ShippingOptionEnum,
} from "../metadata/shipping-option";
import { CountryAssociation } from "../metadata/country-association";
import {
  ConfirmationDictionary,
  ConfirmationType,
  ConfirmationTypeEnum,
} from "../metadata/confirmation-type";
import { LabelFormatsEnum } from "../metadata/label-formats";
import { LabelSizesEnum } from "../metadata/label-sizes";
import { CarrierAttributeEnum } from "../metadata/carrier-attributes";

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
    this.ShippingOptions = [];
    Object.keys(definition.ShippingOptions || {}).forEach((key: any) => {
      const options = definition.ShippingOptions as ShippingOptionDictionary;
      const Type = key as ShippingOptionEnum;
      const Name = options[Type] as string;
      this.ShippingOptions?.push({
        Name,
        Type,
      });
    });
    this.DefaultSupportedCountries = definition.DefaultSupportedCountries;
    this.DefaultLabelSizes = definition.DefaultLabelSizes;
    this.LabelFormats = definition.LabelFormats;
    this.DefaultConfirmationTypes = [];
    Object.keys(definition.DefaultConfirmationTypes || {}).forEach(
      (key: any) => {
        const confirmations = definition.DefaultConfirmationTypes as ConfirmationDictionary;
        const Type = key as ConfirmationTypeEnum;
        const Name = confirmations[Type] as string;
        this.DefaultConfirmationTypes.push({
          Name,
          Type,
        });
      }
    );
    this.CarrierAttributes = definition.CarrierAttributes;
    this.TrackingUrl = definition.TrackingUrl;
    this.CarrierUrl = definition.CarrierUrl;
    this.Description = definition.Description;
  }
}
