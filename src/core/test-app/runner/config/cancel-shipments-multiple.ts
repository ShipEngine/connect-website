import {
  WeightUnit,
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  DimensionsPOJO
} from "@shipengine/connect-sdk";

import { BaseTestConfigOptions } from "./base-test-config-options";

export interface CancelShipmentsMultipleTestParams {
  shipments: Array<{
    deliveryServiceName: string;
    shipFrom?: AddressWithContactInfoPOJO;
    shipTo?: AddressWithContactInfoPOJO;
    weight: {
      value: number;
      unit: WeightUnit;
    };
    dimensions: DimensionsPOJO;
    shipDateTime: DateTimeZonePOJO | Date | string;
  }>
}

// export type CancelShipmentsMultipleTestParams = Array<{
//   deliveryServiceName: string;
//   shipFrom?: AddressWithContactInfoPOJO;
//   shipTo?: AddressWithContactInfoPOJO;
//   weight: {
//     value: number;
//     unit: WeightUnit;
//   };
//   dimensions: DimensionsPOJO;
//   shipDateTime: DateTimeZonePOJO | Date | string;
// }>

export interface CancelShipmentsMultipleConfigOptions
  extends CancelShipmentsMultipleTestParams,
  BaseTestConfigOptions { }
