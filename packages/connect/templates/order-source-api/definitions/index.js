const {  AuthenticationType } = require("@shipengine/connect-order-source-api");
const { brandOne } = require("./order-source");

module.exports.Metadata = {
    // DO NOT CHANGE THIS ID AFTER PUBLISHING
    Id: "<%- _uuidv4 %>",
    Name: "<%- _appName %>",
    AuthProcess: {
        Identifier: {
            AuthenticationType: AuthenticationType.Basic,
            IsSandbox: false
        }
    },
    OrderSources: [brandOne]
};
