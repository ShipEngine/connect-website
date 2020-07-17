import {
  Address,
  DateTimeZonePOJO,
  WeightPOJO,
  DocumentSize,
  DocumentFormat,
} from "@shipengine/integration-platform-sdk";

export interface TestOptions {
  debug?: boolean;
  expectedErrorMessage?: string;
  retries?: number;
  skip?: boolean;
  timeout?: number;
}

export interface CreateShipmentDomesticOptions extends TestOptions {
  shipFrom?: Address;
  shipTo?: Address;
  weight: WeightPOJO;
  shipDateTime?: DateTimeZonePOJO | Date | string;
  deliveryServiceName?: string;
}

export interface CreateShipmentInternationalOptions extends TestOptions {
  deliveryConfirmationName?: string;
  deliveryServiceName?: string;
  labelFormat: DocumentFormat;
  labelSize: DocumentSize;
  shipDateTime?: DateTimeZonePOJO | Date | string;
  shipFrom?: Address;
  shipTo?: Address;
  weight: WeightPOJO;
  weightValue?: number;
}

export interface TestsConfig {
  cancelPickups?: (TestOptions & TestOptions) | [TestOptions];
  cancelShipments?: TestOptions | [TestOptions];
  createManifest?: TestOptions | [TestOptions];
  createShipment_domestic?:
    | CreateShipmentDomesticOptions
    | [CreateShipmentDomesticOptions];
  createShipment_international?:
    | CreateShipmentInternationalOptions
    | [CreateShipmentInternationalOptions];
  createShipment_multi_package?: TestOptions | [TestOptions];
  rateShipment?: TestOptions | [TestOptions];
  schedulePickup?: TestOptions | [TestOptions];
  trackShipment?: TestOptions | [TestOptions];
}

export default interface Config {
  concurrency?: number;
  connect_args?: object;
  debug?: boolean;
  failFast?: boolean;
  retries?: number;
  session?: object;
  tests?: TestsConfig;
  timeout?: number;
}
