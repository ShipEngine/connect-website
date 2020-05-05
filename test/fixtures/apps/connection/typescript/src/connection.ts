"use strict";

/** Test Shipping Provider */
const config: ConnectionDefinition = {

  id: "d54ea601-9374-425c-8732-1f9eae4eae18",
  name: "My Connection",
  description: "My Connection description goes here",
  websiteURL: "https://www.my-connection.com",
  logo: "../../../../logo.svg",

  connectForm: "../../../../configs/forms/registration-form.json",
  settingsForm: "../../../../configs/forms/settings-form.json",
  connect: "../../../../modules/methods/login.js",

};

// tslint:disable-next-line: no-default-export
export default config;
