import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  WeightPOJO,
} from "@shipengine/integration-platform-sdk";
import { NewLabelPOJO } from "@shipengine/integration-platform-sdk/lib/internal";
import { BaseTestConfigOptions } from "./base-test-config-options";

export type PackageOptions = {
  packagingName: string;
  label: NewLabelPOJO
  weight: WeightPOJO;
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
