import {
    ShippingService,
    ServiceRequiredPropertiesEnum,
    LabelSizesEnum,
    ServiceGradeEnum,
    ServiceClassEnum,
    ServiceAttributesEnum,
} from '@shipengine/connect-carrier-api';

export const BudgetDelivery: ShippingService = {
    // DO NOT CHANGE THIS ID AFTER PUBLISHING
    Id: "0e300710-3b08-4d18-9eb8-10dd9bde094f",
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
