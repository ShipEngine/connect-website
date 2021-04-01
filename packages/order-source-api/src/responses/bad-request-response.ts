import { DetailedError } from "../models";

/** @description Represents an error response to a request that had client errors */
export interface BadRequestResponse {
  /** @description a list of errors associated with this response */
  detailed_errors?: DetailedError[];
}
