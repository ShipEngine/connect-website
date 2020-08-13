import { Country, DeliveryServiceClass, DeliveryServiceDefinition, DeliveryServiceGrade } from "@shipengine/connect-sdk";
import { flatRatePackaging, largePaddedEnvelope } from "../packaging";

/** Sample Ground Service  */
const groundService: DeliveryServiceDefinition = {
  id: "2a20b066-71c3-11ea-bc55-0242ac130003",

  name: "Ground",

  class: DeliveryServiceClass.Ground,

  grade: DeliveryServiceGrade.Standard,

  code: "priority_overnight",

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

};

export default groundService;
