import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  WeightUnit,
} from "@shipengine/connect-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface RateShipmentTestParams {
  deliveryServiceName: string;
  shipFrom: AddressWithContactInfoPOJO;
  shipTo: AddressWithContactInfoPOJO;
  weight: {
    value: number;
    unit: WeightUnit;
  };
  shipDateTime: DateTimeZonePOJO | Date | string;
  packagingName: string;
}

export interface RateShipmentConfigOptions
  extends RateShipmentTestParams,
    BaseTestConfigOptions {}