import {
  WeightUnit,
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  DimensionsPOJO
} from "@shipengine/connect-sdk";

import { BaseTestConfigOptions } from "./base-test-config-options";

export interface CancelShipmentsSingleTestParams {
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

export interface CancelShipmentsSingleConfigOptions
  extends CancelShipmentsSingleTestParams,
  BaseTestConfigOptions { }
