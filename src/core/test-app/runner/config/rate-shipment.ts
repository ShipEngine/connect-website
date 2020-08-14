import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  WeightPOJO,
} from "@shipengine/connect-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface RateShipmentTestParams {
  deliveryServiceName: string;
  shipFrom: AddressWithContactInfoPOJO;
  shipTo: AddressWithContactInfoPOJO;
  weight: WeightPOJO;
  shipDateTime: DateTimeZonePOJO | Date | string;
  packagingName: string;
}

export interface RateShipmentConfigOptions
  extends RateShipmentTestParams,
    BaseTestConfigOptions {}