import { BaseResponse } from "./base-response";
import { Rate } from "../models";

export interface GetRatesResponse extends BaseResponse {
  rates: Rate[];
}
