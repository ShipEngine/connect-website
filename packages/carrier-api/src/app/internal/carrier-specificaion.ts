import { Carrier } from "../metadata/carrier";
import { AccountModals } from "../metadata/account-modals";
import { PackageType } from "../metadata/package-type";
import { ShippingService } from "../metadata/shipping-service";
import { ShippingOption } from "../metadata/shipping-option";
import { CountryAssociation } from "../metadata/country-association";
import { ConfirmationType } from "../metadata/confirmation-type";
import { LabelFormatsEnum } from "../metadata/label-formats";
import { LabelSizesEnum } from "../metadata/label-sizes";
import { CarrierAttributeEnum } from "../metadata/carrier-attributes";

export class CarrierSpecification {
  Id: string;
  Name: string;
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

  constructor(definition: Carrier) {
    this.Id = definition.Id;
    this.Name = definition.Name;
    this.AccountModals = definition.AccountModals;
    this.PackageTypes = definition.PackageTypes;
    this.ShippingServices = definition.ShippingServices;
    this.ShippingOptions = definition.ShippingOptions;
    this.DefaultSupportedCountries = definition.DefaultSupportedCountries;
    this.DefaultLabelSizes = definition.DefaultLabelSizes;
    this.LabelFormats = definition.LabelFormats;
    this.DefaultConfirmationTypes = definition.DefaultConfirmationTypes;
    this.CarrierAttributes = definition.CarrierAttributes;
    this.TrackingUrl = definition.TrackingUrl;
    this.CarrierUrl = definition.CarrierUrl;
    this.Description = definition.Description;
  }
}
