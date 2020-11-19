import { BaseResponse } from './base-response';
import { TrackingInfo } from '../models';

export interface TrackingResponse extends BaseResponse {
  tracking_info: TrackingInfo;
}
