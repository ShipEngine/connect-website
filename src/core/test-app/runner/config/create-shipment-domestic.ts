import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  DocumentFormat,
  DocumentSize,
  WeightUnit,
} from "@shipengine/integration-platform-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface CreateShipmentDomesticTestParams
  extends BaseTestConfigOptions {
  deliveryServiceName: string;
  labelFormat: DocumentFormat;
  labelSize: DocumentSize;
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
