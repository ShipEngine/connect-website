const {
  ServiceRequiredPropertiesEnum,
  LabelSizesEnum,
  ServiceGradeEnum,
  ServiceClassEnum,
  ServiceAttributesEnum,
} = require('@shipengine/connect-carrier-api');

module.exports.NextDayAir = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "<%- _uuidv4 %>",
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
