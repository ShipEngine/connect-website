import {
  TimeRangePOJO,
  ContactInfoPOJO,
  AddressPOJO,
  WeightPOJO,
  DimensionsPOJO,
  PickupCancellationReason
} from "@shipengine/connect-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";


export type PickupPackageConfig = {
  packagingName: string;
  dimensions?: DimensionsPOJO;
  weight?: WeightPOJO;
};

export type PickupShipmentConfig = {
  deliveryServiceName: string;
  packages: PickupPackageConfig[];
};

export interface CancelSameDayPickupTestParams {
  pickupServiceName: string;
  deliveryServiceName: string;
  address: AddressPOJO;
  contact: ContactInfoPOJO;
  timeWindow: TimeRangePOJO;
  shipments: PickupShipmentConfig[];
  cancellationReason: PickupCancellationReason;
}

export interface CancelSameDayPickupConfigOptions
  extends CancelSameDayPickupTestParams,
    BaseTestConfigOptions {}