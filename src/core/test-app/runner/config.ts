/* eslint-disable camelcase */

import { AcknowledgeOrdersConfigOptions } from "./config/acknowledge-orders";
import { ConnectionFormConfigOptions } from "./config/connect-all-fields";
import { CreateShipmentInternationalConfigOptions } from "./config/create-shipment-international";
import { CreateShipmentDomesticConfigOptions } from "./config/create-shipment-domestic";
import { CreateShipmentMultiPackageConfigOptions } from './config/create-shipment-multipackage';
import { CreateShipmentWithInsuranceConfigOptions } from './config/create-shipment-insurance';
import { RateShipmentConfigOptions } from './config/rate-shipment';
import { RateShipmentWithAllServicesConfigOptions } from './config/rate-shipment-with-all-services';
import { CancelShipmentsSingleConfigOptions } from './config/cancel-shipments-single';
import { CancelShipmentsMultipleConfigOptions } from './config/cancel-shipments-multiple';
import { CreateShipmentReturnConfigOptions } from './config/create-shipment-return';
import { SchedulePickupSameDayConfigOptions } from './config/schedule-pickup-same-day';
import { RateShipmentReturnConfigOptions } from './config/rate-shipment-return';
import { SchedulePickupNextDayConfigOptions } from './config/schedule-pickup-next-day';
import { SchedulePickupMultiShipmentConfigOptions } from './config/schedule-pickup-multi-shipment';

import { TrackShipmentConfigOptions } from './config/track-shipment';
import { TrackShipmentReturnConfigOptions } from './config/track-shipment-return';
import { CancelPickupsSameDayConfigOptions } from './config/cancel-pickups-same-day';

export interface TestsConfig {
  acknowledgeOrders?: AcknowledgeOrdersConfigOptions;
  cancelShipments_single?: CancelShipmentsSingleConfigOptions | [CancelShipmentsSingleConfigOptions];
  cancelShipments_multiple?: CancelShipmentsMultipleConfigOptions | [CancelShipmentsMultipleConfigOptions];
  connectionForm?: ConnectionFormConfigOptions;
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
  rateShipment_return?: RateShipmentReturnConfigOptions | [RateShipmentReturnConfigOptions];
  schedulePickup_multi_shipment?: SchedulePickupMultiShipmentConfigOptions | [SchedulePickupMultiShipmentConfigOptions];
  schedulePickup_same_day?: SchedulePickupSameDayConfigOptions | [SchedulePickupSameDayConfigOptions];
  schedulePickup_next_day?: SchedulePickupNextDayConfigOptions | [SchedulePickupNextDayConfigOptions];
  trackShipment?: TrackShipmentConfigOptions | [TrackShipmentConfigOptions];
  trackReturnShipment?: TrackShipmentReturnConfigOptions | [TrackShipmentReturnConfigOptions];

  cancelPickups_same_day?: CancelPickupsSameDayConfigOptions | [CancelPickupsSameDayConfigOptions];
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
