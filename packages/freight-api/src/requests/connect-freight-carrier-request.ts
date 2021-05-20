import { BaseCarrierRequest } from "./base-carrier-request";

/**
 * Connect a freight carrier account. This is used to supply the appropriate credentials required for connecting to a single freight carrier as identified by the SCAC.
 */
export interface ConnectFreightCarrierRequest extends BaseCarrierRequest {
  /**
   * The credentials as required by the carrier. Refer to the integrations registry for the credentials schema supported for each carrier.
   */
  credentials: any;
}
