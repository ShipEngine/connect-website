import { BaseResponse } from './base-response';

export interface CancelPickupResponse extends BaseResponse {
  confirmation_id?: string;
  successful: boolean;
  status?: string;
  custom_properties?: { [key: string]: string };
}
