import { AccountModals } from "./account-modals";
import { PackageType } from "./package-type";
import { ShippingService } from "./shipping-service";
import { ShippingOption } from "./shipping-option";
import { CountryAssociation } from "./country-association";
import { ConfirmationType } from "./confirmation-type";
import { CarrierAttributeEnum } from "./carrier-attributes";
import { LabelFormatsEnum } from "./label-formats";
import { LabelSizesEnum } from "./label-sizes";

export interface Carrier {
  AccountModals?: AccountModals;
  PackageTypes?: PackageType[];
  ShippingServices?: ShippingService[];
  ShippingOptions?: ShippingOption[];
  DefaultSupportedCountries?: CountryAssociation[];
  DefaultLabelSizes?: LabelSizesEnum[];
  LabelFormats?: LabelFormatsEnum[];
  DefaultConfirmationTypes?: ConfirmationType[];
  CarrierAttributes?: CarrierAttributeEnum[];
  TrackingUrl?: string;
  CarrierUrl?: string;
  Description?: string;
  Name: string;
  Id: string;
}
