import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  WeightUnit,
  NewLabelPOJO,
} from "@shipengine/integration-platform-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface CreateShipmentDomesticTestParams {
  deliveryServiceName: string;
  label: NewLabelPOJO;
  shipFrom: AddressWithContactInfoPOJO;
  shipTo: AddressWithContactInfoPOJO;
  weight: {
    value: number;
    unit: WeightUnit;
  };
  shipDateTime: DateTimeZonePOJO | Date | string;
  packagingName: string;
  deliveryConfirmationName?: string;
}

export interface CreateShipmentDomesticConfigOptions
  extends CreateShipmentDomesticTestParams,
    BaseTestConfigOptions {}
