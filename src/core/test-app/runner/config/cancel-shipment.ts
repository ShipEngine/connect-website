import {
  WeightUnit,
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  DimensionsPOJO
} from "@shipengine/connect-sdk";

import { BaseTestConfigOptions } from "./base-test-config-options";

export interface CancelShipmentTestParams {
  deliveryServiceName: string;
  shipFrom?: AddressWithContactInfoPOJO;
  shipTo?: AddressWithContactInfoPOJO;
  weight: {
    value: number;
    unit: WeightUnit;
  };
  dimensions: DimensionsPOJO;
  shipDateTime: DateTimeZonePOJO | Date | string;
}

export interface CancelShipmentConfigOptions
  extends CancelShipmentTestParams,
  BaseTestConfigOptions { }
