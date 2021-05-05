import {
  Carrier,
  LabelSizesEnum,
  LabelFormatsEnum,
  ShippingOptionEnum,
  ConfirmationTypeEnum,
} from '@shipengine/connect-carrier-api';

import {
  Box,
  Bag,
} from './packaging';

import {
  NextDayAir,
  BudgetDelivery,
} from './shipping-services';

export const DemoCarrier: Carrier = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "<%- _uuidv4 %>",
  Name: 'Demo Carrier',
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
