import * as API from '..';
import { FreightAppMetadata } from './freight-app-metadata';

/**
 * @description This defines a connect freight app
 */
export interface FreightAppDefinition {
  Metadata: FreightAppMetadata;
  /**
   * @description This method creates connections to freight carrier accounts
   * @param request The freight carrier credentials used to connect the account
   */
  ConnectFreightCarrier?: (
    request: API.ConnectFreightCarrierRequest,
  ) =>
    | API.ConnectFreightCarrierResponse
    | Promise<API.ConnectFreightCarrierResponse>;
  /**
   * @description This method retrieves a freight quote
   * @param request The information necessary to get a quote from a carrier
   */
  FreightQuote?: (
    request: API.FreightQuoteRequest,
  ) => API.FreightQuoteResponse | Promise<API.FreightQuoteResponse>;
  /**
   * @description This method retrieves the freight documents for a shipment
   * @param request The information necessary to access freight shipment documents
   */
  FreightShipmentDocuments?: (
    request: API.FreightShipmentDocumentsRequest,
  ) =>
    | API.FreightShipmentDocumentsRequest
    | Promise<API.FreightShipmentDocumentsResponse>;
  /**
   * @description This method retrieves a freight spot/volume quote
   * @param request The information necessary to get a quote from a carrier
   */
  FreightSpotQuote?: (
    request: API.FreightSpotQuoteRequest,
  ) => API.FreightSpotQuoteResponse | Promise<API.FreightSpotQuoteResponse>;
  /**
   * @description This method provisions a freight provider account for a tenant
   * @param request The information necessary to provision a tenant freight provider account
   */
  ProvisionFreightProviderAccount?: (
    request: API.ProvisionFreightProviderAccountRequest,
  ) =>
    | API.ProvisionFreightProviderAccountResponse
    | Promise<API.ProvisionFreightProviderAccountResponse>;
  /**
   * @description This method schedules a freight pickup
   * @param request The information necessary to schedule a freight pickup
   */
  ScheduleFreightPickup?: (
    request: API.ScheduleFreightPickupRequest,
  ) =>
    | API.ScheduleFreightPickupResponse
    | Promise<API.ScheduleFreightPickupResponse>;
  /**
   * @description This method retrieves tracking information for a freight shipment
   * @param request The information necessary to track a freight shipment
   */
  TrackFreightShipment?: (
    request: API.TrackFreightShipmentRequest,
  ) =>
    | API.TrackFreightShipmentResponse
    | Promise<API.TrackFreightShipmentResponse>;
}
