import { FreightCarrierSpecification } from "@shipengine/connect-freight-api";
import { join } from "path";

export const TFCA: FreightCarrierSpecification = {
  Id: "f9d052d6-50ed-4966-8b17-73f2a053e179",
  ApiCode: "tfca",
  Code: "TFCA",
  Name: "Test Freight Carrier A",
  ServiceLevels: [
    {
      Id: "f58151cf-d746-4c1b-aafa-c144e8bb8037",
      ApiCode: "gtd_am",
      Code: "GTD_AM",
      Name: "Guaranteed Morning",
    },
    {
      Id: "41f985b3-5620-40cb-b4cb-d464a50a8264",
      ApiCode: "gtd_noon",
      Code: "GTD_NOON",
      Name: "Guaranteed Noon",
    },
    {
      Id: "7405df64-6eb5-4f8c-97a3-e71aa520fa53",
      ApiCode: "gtd_pm",
      Code: "GTD_PM",
      Name: "Guaranteed End of Day",
    },
    {
      Id: "7c756a8a-407c-4d97-a935-83e3f18f7daf",
      ApiCode: "stnd",
      Code: "STND",
      Name: "Standard",
    },
  ],
  ContainerTypes: [
    {
      Id: "cd142cba-e940-4c48-89e3-1af543e7e39a",
      ApiCode: "box",
      Code: "BOX",
      Name: "Box",
    },
    {
      Id: "997a54cc-f6ba-4eb6-b554-f5c1f3ff97f0",
      ApiCode: "pat",
      Code: "PAT",
      Name: "Pallet",
    },
    {
      Id: "125c78de-e461-4d00-8a45-a3561747190a",
      ApiCode: "skd",
      Code: "SKD",
      Name: "Skid",
    },
  ],
  AccessorialServiceGroups: [
    {
      Id: "9dc67ddd-6635-4950-b644-9df16bdb4d13",
      Name: "Pickup Services",
      SortOrder: 1,
      Services: [
        {
          Id: "885d69db-bb7d-4911-9179-6110490207ce",
          ApiCode: "lftp",
          Code: "LFTP",
          Name: "Lift gate required at pickup",
          SortOrder: 1,
        },
        {
          Id: "0ffdbedd-ee72-43b1-b95e-b206ee5eda14",
          ApiCode: "ipu",
          Code: "IPU",
          Name: "Inside pickup",
          SortOrder: 2,
        },
        {
          Id: "afb9e204-66c9-4f77-80bc-6051d4a58acf",
          ApiCode: "rep",
          Code: "REP",
          Name: "Residential pickup",
          SortOrder: 3,
        },
      ],
    },
    {
      Id: "9c6bd242-2b10-41a5-b8c3-6df18469c537",
      Name: "Other",
      SortOrder: 2,
      Services: [
        {
          Id: "5edaf953-c6d6-48bb-b42b-c3a4b7c04151",
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
      title: "Test Freight Carrier A",
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
    LogoUrl: join(__dirname, "../../assets/TFCA/logo.svg"),
    IconUrl: join(__dirname, "../../assets/TFCA/icon.svg"),
  },
};

export default TFCA;
