import { Credentials } from "../models";

/** @description Basic structure for a response to register/connect */
export interface RegisterResponse {
  credentials: Credentials;
  metadata: object;
}
