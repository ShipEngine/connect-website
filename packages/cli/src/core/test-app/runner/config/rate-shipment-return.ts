import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  WeightPOJO,
  DimensionsPOJO,
} from "@shipengine/connect-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface RateShipmentReturnTestParams {
  deliveryServiceName: string;
  packagingName: string;
  shipDateTime: DateTimeZonePOJO | Date | string;
  shipFrom: AddressWithContactInfoPOJO;
  shipTo: AddressWithContactInfoPOJO;
  weight: WeightPOJO;
  dimensions: DimensionsPOJO;
}

export interface RateShipmentReturnConfigOptions
  extends RateShipmentReturnTestParams,
  BaseTestConfigOptions { }
