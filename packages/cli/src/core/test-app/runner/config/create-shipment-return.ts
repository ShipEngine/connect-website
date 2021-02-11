import {
  WeightUnit,
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  DimensionsPOJO
} from "@shipengine/connect-sdk";
import { NewLabelPOJO } from "@shipengine/connect-sdk/lib/internal";

import { BaseTestConfigOptions } from "./base-test-config-options";

export interface CreateShipmentReturnTestParams {
  deliveryServiceName: string;
  label: NewLabelPOJO;
  shipFrom?: AddressWithContactInfoPOJO;
  returnTo?: AddressWithContactInfoPOJO;
  weight: {
    value: number;
    unit: WeightUnit;
  };
  dimensions: DimensionsPOJO;
  shipDateTime: DateTimeZonePOJO | Date | string;
  deliveryConfirmationName?: string;
  rmaNumber?: string;
}

export interface CreateShipmentReturnConfigOptions
  extends CreateShipmentReturnTestParams,
    BaseTestConfigOptions {}
