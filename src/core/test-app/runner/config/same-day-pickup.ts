import {
  TimeRangePOJO,
  ContactInfoPOJO,
  AddressPOJO,
} from "@shipengine/connect-sdk";
import { BaseTestConfigOptions } from "./base-test-config-options";
import { PickupShipmentPOJO } from '@shipengine/connect-sdk/lib/internal';

export interface SameDayPickupTestParams {
  pickupServiceName: string;
  deliveryServiceName: string;
  address: AddressPOJO;
  contact: ContactInfoPOJO;
  timeWindow: TimeRangePOJO;
  shipments: PickupShipmentPOJO[];
}

export interface SameDayPickupConfigOptions
  extends SameDayPickupTestParams,
    BaseTestConfigOptions {}