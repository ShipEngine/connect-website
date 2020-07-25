import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  WeightUnit,
} from "@shipengine/integration-platform-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface RateShipmentWithOneServiceTestParams {
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

export interface RateShipmentWithOneServiceConfigOptions
  extends RateShipmentWithOneServiceTestParams,
    BaseTestConfigOptions {}