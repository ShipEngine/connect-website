import {
  PackageAttribute,
  PackageType,
} from '@shipengine/connect-carrier-api';

export const Box: PackageType = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "f897b5ca-44eb-420a-979e-4788876f6268",
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
