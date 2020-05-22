"use strict";

module.exports = {

  id: "d54ea601-9374-425c-8732-1f9eae4eae18",
  name: "My Order",
  description: "My order description goes here",
  websiteURL: "https://www.my-order.com",
  logo: "../../../logo.svg",

  connectionForm: {
    dataSchema: {
      title: "Order One Registration",
      description: "Login with your Order One account information.",
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
        "ui:help": "Password for order account"
      }
    }
  },

  settingsForm: {
    dataSchema: {
      title: "Order One Settings",
      description: "Update your Order One account information.",
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
        "ui:help": "Password for order account"
      }
    }
  },

  connect () {},
  getSeller () {},
  getSalesOrder () {},
  getSalesOrdersByDate () {},

};
