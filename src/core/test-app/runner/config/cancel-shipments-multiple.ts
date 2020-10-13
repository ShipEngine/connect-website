import {
  WeightUnit,
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  DimensionsPOJO
} from "@shipengine/connect-sdk";

import { BaseTestConfigOptions } from "./base-test-config-options";

export interface ShipmentConfig {
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

export interface CancelShipmentsMultipleTestParams {
  shipments: Array<ShipmentConfig>
}

export interface CancelShipmentsMultipleConfigOptions
  extends CancelShipmentsMultipleTestParams,
  BaseTestConfigOptions { }
