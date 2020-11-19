import { BaseRequest } from './base-request';

export interface RegisterRequest<T> extends BaseRequest {
  registration_info: T;
  warehouses?: any[];
}
