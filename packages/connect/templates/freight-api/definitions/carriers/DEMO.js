const { join } = require("path");

// DO NOT CHANGE ANY ID VALUES AFTER PUBLISHING
module.exports.DEMO = {
  Id: "<%- _uuidv4 %>",
  Code: "DEMO",
  Name: "Demo Freight Carrier",
  ServiceLevels: [
    {
      Id: "<%- _uuidv4 %>",
      Code: "GTD_AM",
      Name: "Guaranteed Morning",
    },
    {
      Id: "<%- _uuidv4 %>",
      Code: "GTD_NOON",
      Name: "Guaranteed Noon",
    },
    {
      Id: "<%- _uuidv4 %>",
      Code: "GTD_PM",
      Name: "Guaranteed End of Day",
    },
    {
      Id: "<%- _uuidv4 %>",
      Code: "STND",
      Name: "Standard",
    },
  ],
  ContainerTypes: [
    {
      Id: "<%- _uuidv4 %>",
      Code: "BOX",
      Name: "Box",
    },
    {
      Id: "<%- _uuidv4 %>",
      Code: "PAT",
      Name: "Pallet",
    },
    {
      Id: "<%- _uuidv4 %>",
      Code: "SKD",
      Name: "Skid",
    },
  ],
  AccessorialServiceGroups: [
    {
      Id: "<%- _uuidv4 %>",
      Name: "Pickup Services",
      SortOrder: 1,
      Services: [
        {
          Id: "<%- _uuidv4 %>",
          Code: "LFTP",
          Name: "Lift gate required at pickup",
          SortOrder: 1,
        },
        {
          Id: "<%- _uuidv4 %>",
          Code: "IPU",
          Name: "Inside pickup",
          SortOrder: 2,
        },
        {
          Id: "<%- _uuidv4 %>",
          Code: "REP",
          Name: "Residential pickup",
          SortOrder: 3,
        },
      ],
    },
    {
      Id: "<%- _uuidv4 %>",
      Name: "Other",
      SortOrder: 2,
      Services: [
        {
          Id: "<%- _uuidv4 %>",
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
      title: "Demo Freight Carrier",
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
    LogoUrl: join(__dirname, "../../assets/DEMO/logo.svg"),
    IconUrl: join(__dirname, "../../assets/DEMO/icon.svg"),
  },
};

export default DEMO;
