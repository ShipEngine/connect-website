const { DEMO } = require("./carriers/DEMO");

module.exports.Metadata = {
  Id: "<%- _uuidv4 %>",
  Name: "<%- _appName %>",
  FreightCarriers: [DEMO],
};
