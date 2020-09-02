import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  WeightPOJO,
} from "@shipengine/connect-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface RateShipmentWithAllServicesTestParams {
  shipFrom: AddressWithContactInfoPOJO;
  shipTo: AddressWithContactInfoPOJO;
  weight: WeightPOJO;
  shipDateTime: DateTimeZonePOJO | Date | string;
}

export interface RateShipmentWithAllServicesConfigOptions
  extends RateShipmentWithAllServicesTestParams,
    BaseTestConfigOptions {}