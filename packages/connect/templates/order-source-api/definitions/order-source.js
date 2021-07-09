const { ConnectionFormSchema } = require("../forms/connect");
const { join } = require("path");

module.exports.brandOne = {
    // DO NOT CHANGE THIS ID AFTER PUBLISHING
    Id: "<%- _uuidv4 %>",
    Name: "<%- _appName %>",
    SendEmail: false,
    CanRefresh: false,
    CanConfigureTimeZone: false,
    CanConfirmShipments: false,
    CanLeaveFeedback: false,
    HasCustomMappings: false,
    HasCustomStatuses: false,
    HasInventoryLevels: false,
    AccountConnection: {
        Name: "<%- _appName %> Connection",
        ConnectionFormSchema
    },
    Images: {
        Logo: join(__dirname, "../../assets/logo.svg"),
        Icon: join(__dirname, "../../assets/icon.svg"),
    }
};
