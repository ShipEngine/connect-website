import { DetailedError } from "../models";

export interface BadRequestResponse {
  detailed_errors?: DetailedError[];
}
