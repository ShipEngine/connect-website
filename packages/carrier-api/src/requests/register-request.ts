import { BaseRequest } from './base-request';

export interface RegisterRequest extends BaseRequest {
  registration_info: object;
  warehouses?: any[];
}
