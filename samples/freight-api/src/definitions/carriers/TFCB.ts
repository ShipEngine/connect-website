import { FreightCarrierSpecification } from "@shipengine/connect-freight-api";
import { join } from "path";

export const TFCB: FreightCarrierSpecification = {
  Id: "2714afc0-b207-4ea4-ab5a-8de4ce0e5ce6",
  ApiCode: "tfcb",
  Code: "TFCB",
  Name: "Test Freight Carrier B",
  ServiceLevels: [
    {
      Id: "1686cca3-98ce-42bd-9815-a9fbe87bb617",
      ApiCode: "gtd_am",
      Code: "GTD_AM",
      Name: "Guaranteed Morning",
    },
    {
      Id: "4312d30e-f6ed-4da6-8e5b-d79f649c0e19",
      ApiCode: "gtd_noon",
      Code: "GTD_NOON",
      Name: "Guaranteed Noon",
    },
    {
      Id: "0a012cd4-c2a3-4b1f-9787-4ab21bf782ed",
      ApiCode: "gtd_pm",
      Code: "GTD_PM",
      Name: "Guaranteed End of Day",
    },
    {
      Id: "72fe2139-114e-433b-bdb6-c3f20b58f7ff",
      ApiCode: "stnd",
      Code: "STND",
      Name: "Standard",
    },
  ],
  ContainerTypes: [
    {
      Id: "5eafe403-636d-4519-9135-54083710a314",
      ApiCode: "box",
      Code: "BOX",
      Name: "Box",
    },
    {
      Id: "708aa553-166b-4280-a9d5-3559ec5c46a7",
      ApiCode: "pat",
      Code: "PAT",
      Name: "Pallet",
    },
    {
      Id: "cb49d96d-7f12-4687-87ef-8849590f624d",
      ApiCode: "skd",
      Code: "SKD",
      Name: "Skid",
    },
  ],
  AccessorialServiceGroups: [
    {
      Id: "af4ed99c-2d47-4101-811d-9ee3fde071da",
      Name: "Pickup Services",
      SortOrder: 1,
      Services: [
        {
          Id: "e0d05024-87a3-4e9c-b06d-02411e8f72d3",
          ApiCode: "lftp",
          Code: "LFTP",
          Name: "Lift gate required at pickup",
          SortOrder: 1,
        },
        {
          Id: "c6612a05-9306-4d32-b1d3-1429c5e4df44",
          ApiCode: "ipu",
          Code: "IPU",
          Name: "Inside pickup",
          SortOrder: 2,
        },
        {
          Id: "54aa6a99-cc13-475d-9a7d-8770414d46a7",
          ApiCode: "rep",
          Code: "REP",
          Name: "Residential pickup",
          SortOrder: 3,
        },
      ],
    },
    {
      Id: "bf77b1d2-20d0-4f43-8eb6-20c32c8b68b4",
      Name: "Other",
      SortOrder: 2,
      Services: [
        {
          Id: "1da3d36d-2def-4d55-9be3-80b49c02cca7",
          ApiCode: "haz",
          Code: "HAZ",
          Name: "Hazardous material",
          Attributes: {
            JsonSchema : {
              type: "object",
              required: ["name", "phone"],
              properties: {
                name: {
                  type: "string",
                  title: "Emergency Contact Name",
                },
                phone: {
                  type: "string",
                  title: "Emergency Contact Phone Number",
                  pattern: "([0-9]{10})",
                },
              },
            },
            UiSchema: {
              phone: {
                "ui:help": "Format: 10 digit",
                "ui:emptyValue": "5555555555",
              },
            },
            ApiContractMapping: [
              {
                apiContractField: "name",
                jsonSchemaProperty: "name"
              },
              {
                apiContractField: "phone",
                jsonSchemaProperty: "phone"
              }
            ],
          },
        },
      ],
    },
  ],
  SupportedCountries: ["USA", "CAN", "MEX"],
  AccountConnection: {
    JsonSchema: {
      title: "Test Freight Carrier B",
      description: "Connect your account",
      type: "object",
      required: ["username", "password"],
      properties: {
        username: {
          type: "string",
          title: "Username",
        },
        password: {
          type: "string",
          title: "Password",
        },
      },
    },
    UiSchema: {
      username: {
        "ui:autofocus": true,
      },
    },
    ApiContractMapping: [
      {
        apiContractField: "username",
        jsonSchemaProperty: "username"
      },
      {
        apiContractField: "password",
        jsonSchemaProperty: "password"
      }
    ]
  },
  Images: {
    LogoUrl: join(__dirname, "../../assets/TFCB/logo.svg"),
    IconUrl: join(__dirname, "../../assets/TFCB/icon.svg"),
  },
};

export default TFCB;
