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
    [ShippingOptionEnum.DryIce]: {
      Name: "Contains Dry Ice",
      Description: "This shipment contains dry ice."
    },
    [ShippingOptionEnum.ContainsAlcohol]: {
      Name: 'Contains Booze',
      Description: 'The person signing needs to be of legal drinking age'
    }, 
    [ShippingOptionEnum.B13ACanada]: {
      Name: "B13A Canadian Export Decleration",
      Description: "The B13A is an Export Declaration and is mandatory for all export shipments valued at CAD 2000.00 and over. Shipments going to U.S. Destinations (including Puerto Rico and the U.S. Virgin Islands) are not required to fill in the B13A form."
    }
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
  TrackingUrl: "https://the.carrier.com/track",
  CarrierUrl: "https://the.carrier.com",
  Images: {
    Logo: join(__dirname, "../../../assets/logo.svg"),
    Icon: join(__dirname, "../../../assets/icon.svg"),
  },
  AccountModals: {
    RegistrationFormSchema: {
      formSchema: {
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
    SettingsFormSchema: {
      formSchema: {
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
  },
};
