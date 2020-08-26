import {
  AddressWithContactInfoPOJO,
  TimeRangePOJO,
  PickupShipment,
  ContactInfoPOJO,
} from "@shipengine/connect-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface SameDayPickupTestParams {
  pickupServiceName: string;
  deliveryServiceName: string;
  address: AddressWithContactInfoPOJO;
  contact: ContactInfoPOJO;
  timeWindow: TimeRangePOJO;
  shipments: PickupShipment[];
}

export interface SameDayPickupConfigOptions
  extends SameDayPickupTestParams,
    BaseTestConfigOptions {}