import { DetailedError } from "../models";

/** @description This represents an error caused by "unhandled" exceptions in the implementation */
export interface InternalServerErrorResponse {
  /** @description a list of errors associated with this response */
  detailed_errors?: DetailedError[];
}
