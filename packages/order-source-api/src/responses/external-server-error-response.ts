import { DetailedError } from "../models";

/** @description Represents an error response that should be returned when an external server error occurrs in the 3rd party. */
export interface ExternalServerErrorResponse {
  /** @description a list of errors associated with this response */
  detailed_errors?: DetailedError[];
}
