import { CreateShipmentInternationalConfigOptions } from "./config/create-shipment-international";
import { CreateShipmentDomesticConfigOptions } from "./config/create-shipment-domestic";
import { CreateShipmentMultiPackageConfigOptions } from './config/create-shipment-multipackage';

export interface TestsConfig {
  // cancelPickups?: (TestOptions & TestOptions) | [TestOptions];
  // cancelShipments?: TestOptions | [TestOptions];
  // createManifest?: TestOptions | [TestOptions];
  createShipment_domestic?:
    | CreateShipmentDomesticConfigOptions
    | [CreateShipmentDomesticConfigOptions];
  createShipment_international?:
    | CreateShipmentInternationalConfigOptions
    | [CreateShipmentInternationalConfigOptions];
  createShipment_multi_package?: CreateShipmentMultiPackageConfigOptions | [CreateShipmentMultiPackageConfigOptions];
  // rateShipment?: RateShipmentOptions | [RateShipmentOptions];
  // schedulePickup?: SchedulePickupOptions | [SchedulePickupOptions];
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
