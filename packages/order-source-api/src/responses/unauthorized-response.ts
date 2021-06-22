import { DetailedError } from '../models';

/** @description This represents an error caused by external authorization issues  */
export interface UnauthorizedResponse {
  /** @description a list of errors associated with this response */
  detailed_errors?: DetailedError[];
}
