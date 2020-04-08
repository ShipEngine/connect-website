import { Country, DeliveryServiceClass, DeliveryServiceConfig, DeliveryServiceGrade } from "@shipengine/ipaas";
import { carrierConfig } from "../carrier/carrier";
import { flatRatePackaging, largePaddedEnvelope } from "../packaging";

/** Sample Ground Service  */
export const groundService: DeliveryServiceConfig = {
  id: "2a20b066-71c3-11ea-bc55-0242ac130003",

  name: "Ground",

  class: DeliveryServiceClass.Ground,

  grade: DeliveryServiceGrade.Standard,

  carrier: carrierConfig,

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
  ]
};

