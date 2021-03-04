import { DetailedError } from "../models";

export interface UnauthorizedResponse {
  detailed_errors?: DetailedError[];
}
