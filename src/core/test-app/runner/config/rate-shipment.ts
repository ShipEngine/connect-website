import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  WeightPOJO,
} from "@shipengine/connect-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface RateShipmentTestParams {
  deliveryServiceName: string;
  packagingName: string;
  shipDateTime: DateTimeZonePOJO | Date | string;
  shipFrom: AddressWithContactInfoPOJO;
  shipTo: AddressWithContactInfoPOJO;
  weight: WeightPOJO;
}

export interface RateShipmentConfigOptions
  extends RateShipmentTestParams,
  BaseTestConfigOptions { }
