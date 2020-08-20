import {
  AddressWithContactInfoPOJO,
  TimeRangePOJO,
  PickupShipment,
} from "@shipengine/connect-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface SameDayPickupTestParams {
  pickupServiceName: string;
  address: AddressWithContactInfoPOJO;
  timeWindow: TimeRangePOJO;
  shipments: PickupShipment[];
  deliveryServiceName: string;
}

export interface SameDayPickupConfigOptions
  extends SameDayPickupTestParams,
    BaseTestConfigOptions {}