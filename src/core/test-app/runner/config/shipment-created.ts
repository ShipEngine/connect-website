import { AddressWithContactInfoPOJO, DateTimeZonePOJO, SalesOrderIdentifierPOJO } from '@shipengine/connect-sdk';
import { SalesOrderPackageItemPOJO } from "@shipengine/connect-sdk/lib/internal";
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface ShipmentCreatedTestParams {
  trackingURL?: string;
  salesOrder: SalesOrderIdentifierPOJO;
  carrierCode?: string;
  carrierServiceCode?: string;
  shipFrom: AddressWithContactInfoPOJO;
  shipTo: AddressWithContactInfoPOJO;
  shipDateTime: DateTimeZonePOJO | Date | string;
  contents: SalesOrderPackageItemPOJO[];
  accessToken?: string;
}

export interface ShipmentCreatedConfigOptions
  extends ShipmentCreatedTestParams,
  BaseTestConfigOptions { }