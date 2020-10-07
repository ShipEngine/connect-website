import {
  WeightUnit,
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  DimensionsPOJO
} from "@shipengine/connect-sdk";
import { NewLabelPOJO } from "@shipengine/connect-sdk/lib/internal";

import { BaseTestConfigOptions } from "./base-test-config-options";

export interface ConnectionFormTestParams {
  deliveryServiceName: string;
  label: NewLabelPOJO;
  shipFrom?: AddressWithContactInfoPOJO;
  shipTo?: AddressWithContactInfoPOJO;
  weight: {
    value: number;
    unit: WeightUnit;
  };
  dimensions: DimensionsPOJO;
  shipDateTime: DateTimeZonePOJO | Date | string;
  deliveryConfirmationName?: string;
}

export interface ConnectionFormConfigOptions
  extends ConnectionFormTestParams,
    BaseTestConfigOptions {}