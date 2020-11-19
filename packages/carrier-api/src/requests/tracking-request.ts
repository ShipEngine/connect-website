import { BaseRequest } from './base-request';
import { TrackingIdentifier, TrackingAttribute } from '../models';

export interface TrackingRequest extends BaseRequest {
  tracking_number?: string;
  is_return?: boolean;
  identifiers?: TrackingIdentifier[];
  attributes?: TrackingAttribute[];
}
