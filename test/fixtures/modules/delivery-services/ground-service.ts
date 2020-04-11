import { Country, DeliveryServiceClass, DeliveryServiceConfig, DeliveryServiceGrade } from "@shipengine/ipaas";
import { flatRatePackaging, largePaddedEnvelope } from "../packaging";

/** Sample Ground Service  */
const groundService: DeliveryServiceConfig = {
  id: "2a20b066-71c3-11ea-bc55-0242ac130003",

  name: "Ground",

  class: DeliveryServiceClass.Ground,

  grade: DeliveryServiceGrade.Standard,

  carrier: "../carrier/carrier.ts",

  originCountries: [
    Country.UnitedStates
  ],

  destinationCountries: [
    Country.UnitedStates,
    Country.Canada,
    Country.Mexico,
  ],

  packaging: [
    flatRatePackaging,
    largePaddedEnvelope
  ],

  requiresManifest: false
};

// tslint:disable-next-line: no-default-export
export default groundService;
