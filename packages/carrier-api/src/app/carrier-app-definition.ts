import {
  RegisterRequest,
  CreateLabelRequest,
  VoidLabelsRequest,
  CreateManifestRequest,
  SchedulePickupRequest,
  CancelPickupRequest,
  GetRatesRequest,
  TrackingRequest,
} from "../requests";

import {
  RegisterResponse,
  CreateLabelResponse,
  VoidLabelsResponse,
  CreateManifestResponse,
  SchedulePickupResponse,
  CancelPickupResponse,
  GetRatesResponse,
  TrackingResponse,
} from "../responses";

import { CarrierAppMetadata } from "./metadata/carrier-app-metadata";

/**
 * @description This defines a connect carrier app
 */
export interface CarrierAppDefinition {
  Metadata: CarrierAppMetadata;
  /**
   * @description This method is used to register an account
   * @param request The information needed to register or initialize a connection with the shipping provider
   */
  Register?: (
    request: RegisterRequest
  ) => RegisterResponse | Promise<RegisterResponse>;
  /**
   * @description This method is used to create a label
   * @param request Data needed by the provider to create a label
   */
  CreateLabel?: (
    request: CreateLabelRequest
  ) => CreateLabelResponse | Promise<CreateLabelResponse>;
  /**
   * @description This method is used to void multiple labels
   * @param request Data needed by the provider to void multiple labels
   */
  VoidLabels?: (
    request: VoidLabelsRequest
  ) => VoidLabelsResponse | Promise<VoidLabelsResponse>;
  /**
   * @description This method is used to create a manifest with a carrier
   * @param request Data needed by the provider to create a manifest
   */
  CreateManifest?: (
    request: CreateManifestRequest
  ) => CreateManifestResponse | Promise<CreateManifestResponse>;
  /**
   * @description This endpoint is used to schedule an adhoc pickup with the shipping provider
   * @param request Data needed by the provider to schedule adhoc pickups
   */
  SchedulePickup?: (
    request: SchedulePickupRequest
  ) => SchedulePickupResponse | Promise<SchedulePickupResponse>;
  /**
   * @description This endpoint is used to cancel a previously scheduled pickup
   * @param request Data needed by the provider to cancel a pickup
   */
  CancelPickup?: (
    request: CancelPickupRequest
  ) => CancelPickupResponse | Promise<CancelPickupResponse>;
  /**
   * @description This endpoint is used to get rates for a particular shipment
   * @param request Data needed by the provider to get a rate estimate
   */
  GetRates?: (
    request: GetRatesRequest
  ) => GetRatesResponse | Promise<GetRatesResponse>;
  /**
   * @description This endpoint is used to get tracking information about a shipment
   * @param request Data needed by the provider to track a shipment
   */
  Track?: (
    request: TrackingRequest
  ) => TrackingResponse | Promise<TrackingResponse>;
}
