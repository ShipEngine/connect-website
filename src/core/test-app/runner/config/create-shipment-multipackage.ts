import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  WeightPOJO,
} from "@shipengine/connect-sdk";
import { NewLabelPOJO } from "@shipengine/connect-sdk/lib/internal";
import { BaseTestConfigOptions } from "./base-test-config-options";

export type PackageOptions = {
  packagingName: string;
  label: NewLabelPOJO
  weight: WeightPOJO;
}

export interface CreateShipmentMultiPackageTestParams {
  deliveryServiceName: string;
  deliveryConfirmationName?: string;
  shipFrom: AddressWithContactInfoPOJO;
  shipTo: AddressWithContactInfoPOJO;
  shipDateTime: DateTimeZonePOJO | Date | string;
  packages: Array<PackageOptions>;
}

export interface CreateShipmentMultiPackageConfigOptions
  extends CreateShipmentMultiPackageTestParams,
    BaseTestConfigOptions {}
