import { CreateShipmentInternationalConfigOptions } from "./config/create-shipment-international";
import { CreateShipmentDomesticConfigOptions } from "./config/create-shipment-domestic";
import { CreateShipmentMultiPackageConfigOptions } from './config/create-shipment-multipackage';
import { CreateShipmentWithInsuranceConfigOptions } from './config/create-shipment-insurance';
import { RateShipmentConfigOptions } from './config/rate-shipment';
import { CancelShipmentConfigOptions } from './config/cancel-shipment';

export interface TestsConfig {
  // cancelPickups?: (TestOptions & TestOptions) | [TestOptions];
  cancelShipment?: CancelShipmentConfigOptions | [CancelShipmentConfigOptions];
  // createManifest?: TestOptions | [TestOptions];
  createShipment_domestic?:
    | CreateShipmentDomesticConfigOptions
    | [CreateShipmentDomesticConfigOptions];
  createShipment_international?:
    | CreateShipmentInternationalConfigOptions
    | [CreateShipmentInternationalConfigOptions];
  createShipment_multi_package?: CreateShipmentMultiPackageConfigOptions | [CreateShipmentMultiPackageConfigOptions];
  createShipment_with_insurance?: CreateShipmentWithInsuranceConfigOptions | [CreateShipmentWithInsuranceConfigOptions];
  rateShipment?: RateShipmentConfigOptions | [RateShipmentConfigOptions];

  // createShipment_multi_package?: TestOptions | [TestOptions];
  // rateShipmentWithOneService?: RateShipmentConfigOptions | [RateShipmentConfigOptions];
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
