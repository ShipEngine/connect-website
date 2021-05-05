const {
    ServiceRequiredPropertiesEnum,
    LabelSizesEnum,
    ServiceGradeEnum,
    ServiceClassEnum,
    ServiceAttributesEnum,
} = require('@shipengine/connect-carrier-api');

module.exports.BudgetService = {
    // DO NOT CHANGE THIS ID AFTER PUBLISHING
    Id: "<%- _uuidv4 %>",
    Name: "Budget Delivery",
    Abbreviation: "budget",
    Code: "cheap",
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
