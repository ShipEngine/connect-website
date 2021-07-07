import {
    PackageAttribute,
    PackageType,
    RequiredToShipEnum,
  } from '@shipengine/connect-carrier-api';

export const Bag: PackageType = {
    // DO NOT CHANGE THIS ID AFTER PUBLISHING
    Id: "4abbc03c-2146-446c-8c1d-6d768858f5a4",
    Name: "Bag",
    CarrierPackageTypeCode: "BG_1",
    Description: "This is a plastic bag",
    Abbreviation: "Bg",
    PackageAttributes: [
      PackageAttribute.International,
      PackageAttribute.Domestic,
    ] ,
    RequiredToShip: [RequiredToShipEnum.Weight],
  };
