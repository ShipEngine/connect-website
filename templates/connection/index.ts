import { ConnectionDefinition } from "@shipengine/integration-platform-sdk";

const connection: ConnectionDefinition = {
  id: "<%- _uuidv4 %>",
  name: "<%- _appName %>",
  description: "<%- pjson.description %>",
  logo: "./logo.svg",
  websiteURL: null,
  connectionForm: import("./forms/connect"),
  settingsForm: import("./forms/settings"),
  connect: import("./connect"),
};

export default connection;
