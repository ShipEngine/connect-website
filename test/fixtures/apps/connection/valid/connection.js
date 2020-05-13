"use strict";

module.exports = {

  id: "d54ea601-9374-425c-8732-1f9eae4eae18",
  name: "My Connection",
  description: "My connection description goes here",
  websiteURL: "https://www.my-connection.com",
  logo: "../../../logo.svg",

  connectionForm: {
    dataSchema: {
      title: "Connection One Registration",
      description: "Login with your Connection One account information.",
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
        "ui:help": "Password for connection account"
      }
    }
  },

  settingsForm: {
    dataSchema: {
      title: "Connection One Settings",
      description: "Update your Connection One account information.",
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
        "ui:help": "Password for connection account"
      }
    }
  },

  connect () {},

};
