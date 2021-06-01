const { DEMO } = require("./carriers/DEMO");

module.exports.Metadata = {
  Id: "<%- _appId %>",
  Name: "<%- _appName %>",
  FreightCarriers: [DEMO],
};
