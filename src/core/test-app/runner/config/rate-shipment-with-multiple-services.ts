import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  WeightUnit,
} from "@shipengine/connect-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface RateShipmentWithMultipleServicesTestParams {
  deliveryServiceNames: string[];
  shipFrom: AddressWithContactInfoPOJO;
  shipTo: AddressWithContactInfoPOJO;
  weight: {
    value: number;
    unit: WeightUnit;
  };
  shipDateTime: DateTimeZonePOJO | Date | string;
  packagingName: string;
}

export interface RateShipmentWithMultipleServicesConfigOptions
  extends RateShipmentWithMultipleServicesTestParams,
    BaseTestConfigOptions {}