import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  WeightUnit,
} from "@shipengine/integration-platform-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";
import { MonetaryValue } from '@shipengine/integration-platform-sdk/lib/internal';

export interface CreateShipmentWithInsuranceTestParams {
  deliveryServiceName: string;
  shipFrom: AddressWithContactInfoPOJO;
  shipTo: AddressWithContactInfoPOJO;
  weight: {
    value: number;
    unit: WeightUnit;
  };
  shipDateTime: DateTimeZonePOJO | Date | string;
  packagingName: string;
  deliveryConfirmationName?: string;
  packageInsuredValue: MonetaryValue;
}

export interface CreateShipmentWithInsuranceConfigOptions
  extends CreateShipmentWithInsuranceTestParams,
    BaseTestConfigOptions {}
