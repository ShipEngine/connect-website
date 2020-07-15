import {
  DateTimeZonePOJO,
  WeightUnit,
  DocumentFormat,
  DocumentSize,
  AddressPOJO,
  AddressWithContactInfoPOJO,
} from "@shipengine/integration-platform-sdk";

export interface TestOptions {
  debug?: boolean;
  expectedErrorMessage?: string;
  retries?: number;
  skip?: boolean;
  timeout?: number;
}

export interface CreateShipmentDomesticOptions extends TestOptions {
  deliveryServiceName: string;
  labelFormat: DocumentFormat;
  labelSize: DocumentSize;
  shipFrom: AddressWithContactInfoPOJO;
  shipTo: AddressWithContactInfoPOJO;
  weightValue: number;
  weightUnit: WeightUnit;
  shipDateTime: DateTimeZonePOJO | Date | string;
  packagingName: string;
  deliveryConfirmationName?: string;
}

export interface TestsConfig {
  cancelPickups?: (TestOptions & TestOptions) | [TestOptions];
  cancelShipments?: TestOptions | [TestOptions];
  createManifest?: TestOptions | [TestOptions];
  createShipment_domestic?:
    | CreateShipmentDomesticOptions
    | [CreateShipmentDomesticOptions];
  createShipment_international?: TestOptions | [TestOptions];
  createShipment_multi_package?: TestOptions | [TestOptions];
  rateShipment?: TestOptions | [TestOptions];
  schedulePickup?: TestOptions | [TestOptions];
  trackShipment?: TestOptions | [TestOptions];
}

export default interface Config {
  connect_credentials?: object;
  concurrency?: number;
  debug?: boolean;
  failFast?: boolean;
  retries?: number;
  timeout?: number;
  tests?: TestsConfig;
}
