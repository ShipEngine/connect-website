import { BaseResponse } from './base-response';

/** @description Basic structure for a response to cancel pickup */
export interface CancelPickupResponse extends BaseResponse {
  confirmation_id?: string;
  successful: boolean;
  status?: string;
  custom_properties?: { [key: string]: string };
}
