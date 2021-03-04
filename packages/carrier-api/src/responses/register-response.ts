import { Credentials } from "../models";

export interface RegisterResponse {
  credentials: Credentials;
  metadata: object;
}
