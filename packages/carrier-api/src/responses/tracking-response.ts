import { BaseResponse } from "./base-response";
import { TrackingInfo } from "../models";

/** @description Basic structure for a response to get tracking information */
export interface TrackingResponse extends BaseResponse {
  tracking_info: TrackingInfo;
}
