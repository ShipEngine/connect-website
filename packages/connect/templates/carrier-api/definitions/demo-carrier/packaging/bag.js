const {
  PackageAttribute,
} = require('@shipengine/connect-carrier-api');

module.exports.Bag = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "<%- _uuidv4 %>",
  Name: "Bag",
  CarrierPackageTypeCode: "BG_1",
  Description: "This is a plastic bag",
  Abbreviation: "Bg",
  PackageAttributes: [
    PackageAttribute.International,
    PackageAttribute.Domestic,
  ],
  RequiredToShip: ["Weight"],
};
