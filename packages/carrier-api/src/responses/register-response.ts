import { Credentials } from '../models';

export interface RegisterResponse<T> {
  credentials: Credentials;
  metadata: T;
}
