const {
    LabelSizesEnum,
    LabelFormatsEnum,
    ShippingOptionEnum,
    ConfirmationTypeEnum,
} = require('@shipengine/connect-carrier-api');

const {
    Box,
    Bag,
} = require('./packaging');

const {
    NextDayAir,
    BudgetDelivery,
} = require('./shipping-services');

module.exports.DemoCarrier = {
    // DO NOT CHANGE THIS ID AFTER PUBLISHING
    Id: "<%- _uuidv4 %>",
    Name: '<%- _appName %>',
    Description: 'This is a description about the carrier',
    PackageTypes: [Box, Bag],
    ShippingServices: [NextDayAir, BudgetDelivery],
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
    DefaultConfirmationTypes: {
        [ConfirmationTypeEnum.None]: 'No Confirmation Required',
        [ConfirmationTypeEnum.AdultSignature]: 'Adult Required',
    },
    CarrierAttributes: null,
    TrackingUrl: 'https://the.carrier.com/track',
    CarrierUrl: 'https://the.carrier.com',
};
