import {
  Carrier,
  LabelSizesEnum,
  LabelFormatsEnum,
  ShippingOptionEnum,
  ConfirmationTypeEnum,
} from "@shipengine/connect-carrier-api";

import { join } from "path";

import { Box, Bag } from "./packaging";

import { NextDayAir, BudgetDelivery } from "./shipping-services";

export const DemoCarrier: Carrier = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "15b60bda-e92e-49bf-9fdb-54113d5a96fa",
  Name: "Demo Carrier",
  Description: "This is a description about the carrier",
  PackageTypes: [Box, Bag],
  ShippingServices: [NextDayAir, BudgetDelivery],
  ShippingOptions: {
    [ShippingOptionEnum.DryIce]: "Contains Dry Ice",
    [ShippingOptionEnum.ContainsAlcohol]: undefined, // default name will be used
  },
  DefaultSupportedCountries: [
    {
      FromCountry: "US",
    },
    {
      FromCountry: "GB",
    },
  ],
  DefaultLabelSizes: [LabelSizesEnum.Inches4x6, LabelSizesEnum.Inches4x8],
  LabelFormats: [LabelFormatsEnum.PDF, LabelFormatsEnum.ZPL],
  DefaultConfirmationTypes: {
    [ConfirmationTypeEnum.None]: "No Confirmation Required",
    [ConfirmationTypeEnum.AdultSignature]: "Adult Required",
  },
  CarrierAttributes: null,
  TrackingUrl: "https://the.carrier.com/track",
  CarrierUrl: "https://the.carrier.com",
  Images: {
    Logo: join(__dirname, "../../../assets/logo.svg"),
    Icon: join(__dirname, "../../../assets/icon.svg"),
  },
  AccountModals: {
    RegistrationFormSchema: {
      jsonSchema: {
        type: "object",
        title: "Login Form Example",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            title: "Email Address",
            format: "email",
          },
          password: {
            type: "string",
            title: "Password",
            minLength: 8,
          },
        },
        description: "Connect to your account.",
      },
      uiSchema: {
        email: {
          "ui:autofocus": true,
          "ui:emptyValue": "you@example.com",
        },
        password: {
          "ui:help": "Note: password is case sensitive",
          "ui:widget": "password",
        },
      },
    },
    SettingsFormSchema: {
      jsonSchema: {
        type: "object",
        title: "Login Form Example",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            title: "Email Address",
            format: "email",
          },
          password: {
            type: "string",
            title: "Password",
            minLength: 8,
          },
        },
        description: "Connect to your account.",
      },
      uiSchema: {
        email: {
          "ui:autofocus": true,
          "ui:emptyValue": "you@example.com",
        },
        password: {
          "ui:help": "Note: password is case sensitive",
          "ui:widget": "password",
        },
      },
    },
  },
};
