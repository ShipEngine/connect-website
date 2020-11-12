import { Country, DeliveryServiceDefinition } from "@shipengine/connect-sdk";
import { flatRatePackaging, largePaddedEnvelope } from "../packaging";

/** Sample Ground Service  */
const groundService: DeliveryServiceDefinition = {
  id: "2a20b066-71c3-11ea-bc55-0242ac130003",

  name: "Ground",
  code: "CarrierCode",
  availableCountries: [
    Country.UnitedStates
  ],

  packaging: [
    flatRatePackaging,
    largePaddedEnvelope
  ],

};

// tslint:disable-next-line: no-default-export
export default groundService;
