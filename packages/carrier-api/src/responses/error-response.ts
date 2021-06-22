import { DetailedError } from '../models';

/** @description Basic structure for an error as a response */
export interface ErrorResponse {
  detailed_errors: DetailedError[];
}
