import {
  ShippingService,
  ServiceRequiredPropertiesEnum,
  LabelSizesEnum,
  ServiceGradeEnum,
  ServiceClassEnum,
  ServiceAttributesEnum,
} from '@shipengine/connect-carrier-api';

export const NextDayAir: ShippingService = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "9abb8df6-92c9-4c3d-9ef4-ea96f0d1b36b",
  Name: "Next Day Air",
  Abbreviation: "NDA",
  Code: "nda_01",
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
  Grade: ServiceGradeEnum.Overnight,
  ServiceAttributes: [ServiceAttributesEnum.Returns, ServiceAttributesEnum.MultiPackage, ServiceAttributesEnum.Tracking]
};
