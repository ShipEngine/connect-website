import { BaseResponse } from "./base-response";
import { VoidResponse } from "../models";

/** @description Basic structure for a response to void labels */
export interface VoidLabelsResponse extends BaseResponse {
  /** @description List of void responses*/
  void_responses: VoidResponse[];
}
