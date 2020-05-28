import { BaseResponse } from "./base-response";

export interface RegisterResponse extends BaseResponse {
  /**
   * The credentials that will be used to access this carrier's services. These will be sent
   * as a Basic Authorization header with all future requests.
   */
  credentials: Credentials;
}

/**
* The credentials that will be used to access this carrier's services. These will be sent
* as a Basic Authorization header with all future requests.
*/
export interface Credentials {
  password?: null | string;
  username?: null | string;
}
