import { BaseRequest } from './base-request';

export interface BaseCarrierRequest extends BaseRequest {
  scac: string;
  /**
   * The carrier authorization information needed to fulfill this request.
   */
  auth?: {
    /**
     * Optional freight account access token as required per freight carrier. Tokens are issued via the Provision Freight Account operation.
     */
    access_token?: string;
  };
}
