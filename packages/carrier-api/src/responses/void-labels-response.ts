import { BaseResponse } from "./base-response";
import { VoidResponse } from "../models";

export interface VoidLabelsResponse extends BaseResponse {
  void_responses: VoidResponse[];
}
