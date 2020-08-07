"use strict";

module.exports = {

  id: "d54ea601-9374-425c-8732-1f9eae4eae18",
  name: "My Carrier",
  description: "My Carrier description goes here",
  websiteURL: "https://www.my-carrier.com",
  logo: "../../../logo.svg",
  icon: "../../../logo.svg",
  manifestType: "digital",
  manifestLocations: "single_location",
  manifestShipments: "explicit_shipments",
  trackingURLTemplate: "https://trackingurl.com/{}",

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


  deliveryServices: [{
    id: "2a20b066-71c3-11ea-bc55-0242ac130003",
    name: "Priority Overnight",
    class: "ground",
    grade: "overnight",
    manifestType: "digital",

    originCountries: ["US"],
    destinationCountries: ["US", "CA", "MX"],
    packaging: [
      {
        id: "7c012ad2-71c3-11ea-bc55-0242ac130003",
        name: "Flat-Rate Box"
      },
      {
        id: "e7d6906a-72ba-11ea-bc55-0242ac130003",
        name: "Large Padded Envelope"
      }
    ],
    deliveryConfirmations: [{
      id: "cc10a05a-78eb-11ea-bc55-0242ac130003",
      name: "Adult Signature",
      type: "adult_signature",
      description: "Service that ensures that the recipient of the mail items is at least 21 years of age or above."
    }]
  }],

  pickupServices: [{
    id: "27483200-72b4-11ea-bc55-0242ac130003",
    name: "Drop Off Pickup",
    description: "Take your package to the specified carrier location.",
  }],

  connect () {},
  createShipment () { },
  cancelShipments () { },
  rateShipment () { },
  trackShipment () { },
  createManifest () { },
  schedulePickup () { },
  cancelPickups () { },

};
