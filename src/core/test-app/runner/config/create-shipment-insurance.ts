import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  WeightUnit,
  DimensionsPOJO,
} from "@shipengine/connect-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";
import { MonetaryValue } from '@shipengine/connect-sdk/lib/internal';

export interface CreateShipmentWithInsuranceTestParams {
  deliveryServiceName: string;
  shipFrom: AddressWithContactInfoPOJO;
  shipTo: AddressWithContactInfoPOJO;
  weight: {
    value: number;
    unit: WeightUnit;
  };
  dimensions: DimensionsPOJO;
  shipDateTime: DateTimeZonePOJO | Date | string;
  packagingName: string;
  deliveryConfirmationName?: string;
  packageInsuredValue: MonetaryValue;
}

export interface CreateShipmentWithInsuranceConfigOptions
  extends CreateShipmentWithInsuranceTestParams,
    BaseTestConfigOptions {}
