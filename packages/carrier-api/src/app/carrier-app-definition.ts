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
   * @param request
   */
  CreateLabel?: (
    request: CreateLabelRequest
  ) => CreateLabelResponse | Promise<CreateLabelResponse>;
  /**
   * @description This method is used to void multiple labels
   * @param request
   */
  VoidLabels?: (
    request: VoidLabelsRequest
  ) => VoidLabelsResponse | Promise<VoidLabelsResponse>;
  /**
   * @description This method is used to create a manifest with a carrier
   * @param request
   */
  CreateManifest?: (
    request: CreateManifestRequest
  ) => CreateManifestResponse | Promise<CreateManifestResponse>;
  /**
   * @description This endpoint is used to schedule an adhoc pickup with the shipping provider
   * @param request
   */
  SchedulePickup?: (
    request: SchedulePickupRequest
  ) => SchedulePickupResponse | Promise<SchedulePickupResponse>;
  /**
   * @description This endpoint is used to cancel a previously scheduled pickup
   * @param request
   */
  CancelPickup?: (
    request: CancelPickupRequest
  ) => CancelPickupResponse | Promise<CancelPickupResponse>;
  /**
   * @description This endpoint is used to get rates for a particular shipment
   * @param request
   */
  GetRates?: (
    request: GetRatesRequest
  ) => GetRatesResponse | Promise<GetRatesResponse>;
  /**
   * @description This endpoint is used to get tracking information about a shipment
   * @param request
   */
  Track?: (
    request: TrackingRequest
  ) => TrackingResponse | Promise<TrackingResponse>;
}
