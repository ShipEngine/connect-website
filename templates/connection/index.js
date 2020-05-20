"use strict";

module.exports = {
  id: "<%- _uuidv4 %>",
  name: "<%- _appName %>",
  description: "<%- pjson.description %>",
  logo: "./logo.svg",
  websiteURL: null,
  connectionForm: "forms/connect.js",
  settingsForm: "forms/settings.js",
  connect: "connect.js",
};
