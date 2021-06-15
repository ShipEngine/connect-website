import { AccountModals } from "./account-modals";
import { PackageType } from "./package-type";
import { ShippingService } from "./shipping-service";
import { ShippingOptionDictionary } from "./shipping-option";
import { CountryAssociation } from "./country-association";
import { CarrierAttributeEnum } from "./carrier-attributes";
import { LabelFormatsEnum } from "./label-formats";
import { LabelSizesEnum } from "./label-sizes";
import { ConfirmationDictionary } from "./confirmation-type";

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
