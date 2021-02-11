import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  WeightPOJO,
  DimensionsPOJO,
} from "@shipengine/connect-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface RateShipmentWithAllServicesTestParams {
  shipFrom: AddressWithContactInfoPOJO;
  shipTo: AddressWithContactInfoPOJO;
  weight: WeightPOJO;
  dimensions: DimensionsPOJO;
  shipDateTime: DateTimeZonePOJO | Date | string;
}

export interface RateShipmentWithAllServicesConfigOptions
  extends RateShipmentWithAllServicesTestParams,
    BaseTestConfigOptions {}