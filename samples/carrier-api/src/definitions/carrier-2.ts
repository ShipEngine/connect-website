import {
  Carrier,
  PackageAttribute,
  ShippingService,
  PackageType,
  ServiceRequiredPropertiesEnum,
  LabelSizesEnum,
  LabelFormatsEnum,
  ServiceGradeEnum,
  ServiceClassEnum,
  ServiceAttributesEnum,
  ShippingOptionEnum,
} from '@shipengine/connect-carrier-api';


const aPackage: PackageType = {
  Id: "a8195f65-8381-4a0e-8857-67deaa92ac3b",
  Name: "A Package",
  CarrierPackageTypeCode: "01",
  Description: "A Package",
  Abbreviation: "Pkg",
  PackageAttributes: [
    PackageAttribute.International,
    PackageAttribute.Domestic,
  ] ,
  RequiredToShip: ["Weight"],
};

const aShippingService: ShippingService = {
  Id: "beb82e53-a5bb-4da3-a22a-be22c4e4e3c7",
  Name: "A Shipping Service",
  Abbreviation: "A Service",
  Code: "07",
  International: false,
  RequiredProperties: [ServiceRequiredPropertiesEnum.Dimensions, ServiceRequiredPropertiesEnum.Weight],
  SupportedLabelSizes: [LabelSizesEnum.Inches4x6],
  SupportedCountries: [
    {
      FromCountry: "GB"
    },
    {
      FromCountry: "AU"
    }
  ],
  Class: ServiceClassEnum.OneDayEarly,
  Grade: ServiceGradeEnum.Expedited,
  ServiceAttributes: [ServiceAttributesEnum.Returns, ServiceAttributesEnum.MultiPackage, ServiceAttributesEnum.Tracking]
};

export const CarrierTwo: Carrier = {
  Id: '',
  Name: 'The Second Carrier',
  Description: 'Babys second carrier',
  PackageTypes: [aPackage],
  ShippingServices: [aShippingService],
  ShippingOptions: {
    [ShippingOptionEnum.DryIce]: 'Contains Dry Ice',
    [ShippingOptionEnum.ContainsAlcohol]: undefined, // default name will be used
  },
  DefaultSupportedCountries: [
    {
      FromCountry: 'US',
    },
    {
      FromCountry: "GB",
    }
  ],
  DefaultLabelSizes: [LabelSizesEnum.Inches4x6, LabelSizesEnum.Inches4x8],
  LabelFormats: [LabelFormatsEnum.PDF, LabelFormatsEnum.ZPL],
  DefaultConfirmationTypes: null,
  CarrierAttributes: null,
  TrackingUrl: 'https://the.second-carrier.com/track',
  CarrierUrl: 'https://the.second-carrier.com',
};
