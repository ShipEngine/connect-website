"use strict";

module.exports = {

  id: "d54ea601-9374-425c-8732-1f9eae4eae18",
  name: "My Carrier",
  description: "My Carrier description goes here",
  websiteURL: "https://www.my-carrier.com",
  logo: "../../../logo.svg",

  connectionForm: {
    dataSchema: {
      title: "Carrier One Registration",
      description: "Login with your Carrier One account information.",
      type: "object",
      required: [
        "userName",
        "password"
      ],
      properties: {
        userName: {
          type: "string",
          title: "User Name"
        },
        password: {
          type: "string",
          title: "Password",
          minLength: 3
        }
      }
    },
    uiSchema: {
      userName: {
        "ui:autofocus": true,
        "ui:emptyValue": "Email Address"
      },
      password: {
        "ui:widget": "text",
        "ui:help": "Password for carrier account"
      }
    }
  },

  settingsForm: {
    dataSchema: {
      title: "Carrier One Settings",
      description: "Update your Carrier One account information.",
      type: "object",
      required: [
        "userName",
        "password"
      ],
      properties: {
        userName: {
          type: "string",
          title: "User Name"
        },
        password: {
          type: "string",
          title: "Password",
          minLength: 3
        }
      }
    },
    uiSchema: {
      userName: {
        "ui:autofocus": true,
        "ui:emptyValue": "Email Address"
      },
      password: {
        "ui:widget": "text",
        "ui:help": "Password for carrier account"
      }
    }
  },

  connect () {},
};
