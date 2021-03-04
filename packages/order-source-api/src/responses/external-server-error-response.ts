import { DetailedError } from "../models";

export interface ExternalServerErrorResponse {
  detailed_errors?: DetailedError[];
}
