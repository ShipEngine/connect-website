/* eslint-disable camelcase */

import { CreateShipmentInternationalConfigOptions } from "./config/create-shipment-international";
import { CreateShipmentDomesticConfigOptions } from "./config/create-shipment-domestic";
import { CreateShipmentMultiPackageConfigOptions } from './config/create-shipment-multipackage';
import { CreateShipmentWithInsuranceConfigOptions } from './config/create-shipment-insurance';
import { RateShipmentConfigOptions } from './config/rate-shipment';
import { RateShipmentWithAllServicesConfigOptions } from './config/rate-shipment-with-all-services';
import { CancelShipmentsConfigOptions } from './config/cancel-shipments';
import { CreateShipmentReturnConfigOptions } from './config/create-shipment-return';
import { SameDayPickupConfigOptions } from './config/same-day-pickup';
import { NextDayPickupConfigOptions } from './config/next-day-pickup';

export interface TestsConfig {
  // cancelPickups?: (TestOptions & TestOptions) | [TestOptions];
  cancelShipment?: CancelShipmentsConfigOptions | [CancelShipmentsConfigOptions];
  // createManifest?: TestOptions | [TestOptions];
  createShipment_domestic?:
  | CreateShipmentDomesticConfigOptions
  | [CreateShipmentDomesticConfigOptions];
  createShipment_international?:
  | CreateShipmentInternationalConfigOptions
  | [CreateShipmentInternationalConfigOptions];
  createShipment_multi_package?: CreateShipmentMultiPackageConfigOptions | [CreateShipmentMultiPackageConfigOptions];
  createShipment_with_insurance?: CreateShipmentWithInsuranceConfigOptions | [CreateShipmentWithInsuranceConfigOptions];
  createShipment_return?: CreateShipmentReturnConfigOptions | [CreateShipmentReturnConfigOptions];
  rateShipment?: RateShipmentConfigOptions | [RateShipmentConfigOptions];
  rateShipment_with_all_services?: RateShipmentWithAllServicesConfigOptions | [RateShipmentWithAllServicesConfigOptions];
  schedulePickup_same_day?: SameDayPickupConfigOptions | [SameDayPickupConfigOptions];
  schedulePickup_next_day?: NextDayPickupConfigOptions | [NextDayPickupConfigOptions];
  // createShipment_multi_package?: TestOptions | [TestOptions];
  // rateShipmentWithOneService?: RateShipmentConfigOptions | [RateShipmentConfigOptions];
  // trackShipment?: TestOptions | [TestOptions];
}

export default interface Config {
  connectArgs?: object;
  debug?: boolean;
  failFast?: boolean;
  retries?: number;
  session?: object;
  tests?: TestsConfig;
  timeout?: number;
}
