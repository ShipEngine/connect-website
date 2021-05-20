import { FreightCarrierSpecification } from "@shipengine/connect-freight-api";
import { join } from "path";

export const TFCB: FreightCarrierSpecification = {
  Id: "13d93e45-3719-4a7d-bbca-04ced4194652",
  Code: "TFCB",
  Name: "Test Freight Carrier B",
  ServiceLevels: [
    {
      Id: "173e4945-5aae-4d41-b472-23e50f1bad2c",
      Code: "GTD_AM",
      Name: "Guaranteed Morning",
    },
    {
      Id: "7c29cc4c-b889-47a0-b3ab-1eb9c7706b91",
      Code: "GTD_NOON",
      Name: "Guaranteed Noon",
    },
    {
      Id: "de99b9bb-4c89-45e8-bc50-d021aa4c007a",
      Code: "GTD_PM",
      Name: "Guaranteed End of Day",
    },
    {
      Id: "d8f0369e-3abe-4390-a344-349ffb40af9e",
      Code: "STND",
      Name: "Standard",
    },
  ],
  ContainerTypes: [
    {
      Id: "77c0cfa7-60b5-4519-90c5-53b1273b15c7",
      Code: "BOX",
      Name: "Box",
    },
    {
      Id: "57a13464-1fd7-4c26-b647-0c8272060d40",
      Code: "PAT",
      Name: "Pallet",
    },
    {
      Id: "afeb19ca-f841-4b61-8fbd-affdcfc48999",
      Code: "SKD",
      Name: "Skid",
    },
  ],
  AccessorialServiceGroups: [
    {
      Id: "d2023c1f-7201-4d79-836c-93a3aaf956a6",
      Name: "Pickup Services",
      SortOrder: 1,
      Services: [
        {
          Id: "38719d48-86cf-4a4d-aa59-ed492e4d99b8",
          Code: "LFTP",
          Name: "Lift gate required at pickup",
          SortOrder: 1,
        },
        {
          Id: "4a68e9ea-6153-41f9-a081-49447d3c375c",
          Code: "IPU",
          Name: "Inside pickup",
          SortOrder: 2,
        },
        {
          Id: "a56555d0-280f-4c40-9f0b-e8b5df832790",
          Code: "REP",
          Name: "Residential pickup",
          SortOrder: 3,
        },
      ],
    },
    {
      Id: "61589ee1-7f02-4554-895e-d11598f59b93",
      Name: "Other",
      SortOrder: 2,
      Services: [
        {
          Id: "b58ad4bf-b040-4579-a054-8fdd2e484445",
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
