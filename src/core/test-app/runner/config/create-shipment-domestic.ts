import {
  WeightUnit,
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO
} from "@shipengine/connect-sdk";
import { NewLabelPOJO } from "@shipengine/connect-sdk/lib/internal";

import { BaseTestConfigOptions } from "./base-test-config-options";

export interface CreateShipmentDomesticTestParams {
  deliveryServiceName: string;
  label: NewLabelPOJO;
  shipFrom?: AddressWithContactInfoPOJO;
  shipTo?: AddressWithContactInfoPOJO;
  weight: {
    value: number;
    unit: WeightUnit;
  };
  shipDateTime: DateTimeZonePOJO | Date | string;
  deliveryConfirmationName?: string;
}

export interface CreateShipmentDomesticConfigOptions
  extends CreateShipmentDomesticTestParams,
    BaseTestConfigOptions {}
