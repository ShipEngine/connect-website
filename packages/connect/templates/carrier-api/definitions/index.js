const { DemoCarrier } = require('./demo-carrier');

module.exports.Metadata = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "<%- _appId %>",
  Name: "<%- _appName %>",
  Carriers: [DemoCarrier],
};
