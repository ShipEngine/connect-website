import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  WeightPOJO,
  NewLabelPOJO,
} from "@shipengine/integration-platform-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface CreateShipmentInternationalTestParams {
  deliveryConfirmationName?: string;
  deliveryServiceName?: string;
  label: NewLabelPOJO;
  shipDateTime?: string | DateTimeZonePOJO | Date | undefined;
  shipFrom?: AddressWithContactInfoPOJO;
  shipTo?: AddressWithContactInfoPOJO;
  weight: WeightPOJO;
}

export interface CreateShipmentInternationalConfigOptions
  extends CreateShipmentInternationalTestParams,
    BaseTestConfigOptions {}
