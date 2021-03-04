import { DetailedError } from "../models";

export interface InternalServerErrorResponse {
  detailed_errors?: DetailedError[];
}
