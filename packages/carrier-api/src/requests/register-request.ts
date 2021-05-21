import { BaseRequest } from "./base-request";

/** @description Basic structure for a request to register or connect */
export interface RegisterRequest extends BaseRequest {
  registration_info: object;
  warehouses?: any[];
}
