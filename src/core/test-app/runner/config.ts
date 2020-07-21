import {
  DateTimeZonePOJO,
  WeightUnit,
  DocumentFormat,
  DocumentSize,
  AddressWithContactInfoPOJO,
  DimensionsPOJO,
  WeightPOJO,
  TimeRangePOJO,
  AddressPOJO,
  ContactInfoPOJO,
  Address,
} from "@shipengine/integration-platform-sdk";

export interface TestOptions {
  connectArgs?: object;
  debug?: boolean;
  expectedErrorMessage?: string;
  retries?: number;
  session?: object;
  skip?: boolean;
  timeout?: number;
}

export interface CreateShipmentDomesticOptions extends TestOptions {
  deliveryServiceName: string;
  labelFormat: DocumentFormat;
  labelSize: DocumentSize;
  shipFrom: AddressWithContactInfoPOJO;
  shipTo: AddressWithContactInfoPOJO;
  weight: {
    value: number;
    unit: WeightUnit;
  };
  shipDateTime: DateTimeZonePOJO | Date | string;
  packagingName: string;
  deliveryConfirmationName?: string;
}

export interface RateShipmentAllServicesOptions extends TestOptions {
  deliveryServiceNames: string | string[];
  shipFrom: AddressWithContactInfoPOJO;
  shipTo: AddressWithContactInfoPOJO;
  weight: {
    value: number;
    unit: WeightUnit;
  };
  shipDateTime: DateTimeZonePOJO | Date | string;
  packagingName: string;
}

export type PickupPackageConfig = {
  packagingName: string;
  dimensions?: DimensionsPOJO;
  weight?: WeightPOJO;
  metadata?: object;
}

export type PickupShipmentConfig = {
  deliveryServiceName: string;
  metadata?: object;
  packages: PickupPackageConfig | PickupPackageConfig[]
}

export interface SchedulePickupOptions extends TestOptions {
  pickupServiceName: string;
  timeWindow: TimeRangePOJO;
  address: AddressPOJO;
  contact: ContactInfoPOJO;
  notes: string[] | string;
  shipments: PickupShipmentConfig[] | PickupShipmentConfig;
  shipFrom?: Address;
  shipTo?: Address;
  weight?: WeightPOJO;
  shipDateTime?: DateTimeZonePOJO | Date | string;
  deliveryServiceName?: string;
}

export interface CreateShipmentInternationalOptions extends TestOptions {
  deliveryConfirmationName?: string;
  deliveryServiceName?: string;
  labelFormat: DocumentFormat;
  labelSize: DocumentSize;
  shipDateTime?: DateTimeZonePOJO | Date | string;
  shipFrom?: AddressWithContactInfoPOJO;
  shipTo?: Address;
  weight: WeightPOJO;
  weightValue?: number;
}

export interface TestsConfig {
  cancelPickups?: (TestOptions & TestOptions) | [TestOptions];
  cancelShipments?: TestOptions | [TestOptions];
  createManifest?: TestOptions | [TestOptions];
  createShipment_domestic?: CreateShipmentDomesticOptions | [CreateShipmentDomesticOptions];
  createShipment_international?:
    | CreateShipmentInternationalOptions
    | [CreateShipmentInternationalOptions];
  createShipment_multi_package?: TestOptions | [TestOptions];
  rateShipment?: RateShipmentOptions | [RateShipmentOptions];
  schedulePickup?: SchedulePickupOptions | [SchedulePickupOptions];
  trackShipment?: TestOptions | [TestOptions];
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
