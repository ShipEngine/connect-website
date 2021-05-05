const {
  PackageAttribute,
} = require('@shipengine/connect-carrier-api');

module.exports.Box = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "<%- _uuidv4 %>",
  Name: "Box",
  CarrierPackageTypeCode: "BX_1",
  Description: "This is a cardboard box",
  Abbreviation: "Bx",
  PackageAttributes: [
    PackageAttribute.International,
    PackageAttribute.Domestic,
  ],
  RequiredToShip: ["Weight"],
};
