import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  WeightUnit,
  NewLabelPOJO,
} from "@shipengine/integration-platform-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";


export type PackageOptions = {
  packagingName: string;
  label: NewLabelPOJO
  weight: {
    value: number;
    unit: WeightUnit;
  };
  deliveryConfirmationName?: string;
}

export interface CreateShipmentMultiPackageTestParams {
  deliveryServiceName: string;
  shipFrom: AddressWithContactInfoPOJO;
  shipTo: AddressWithContactInfoPOJO;
  shipDateTime: DateTimeZonePOJO | Date | string;
  packages: Array<PackageOptions>;
}

export interface CreateShipmentMultiPackageConfigOptions
  extends CreateShipmentMultiPackageTestParams,
    BaseTestConfigOptions {}
