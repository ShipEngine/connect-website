import { BaseRequest } from './base-request';
import { TrackingIdentifier, TrackingAttribute } from '../models';

/** @description Basic structure for a request to get tracking information */
export interface TrackingRequest extends BaseRequest {
  /** @description List of identifiers */
  identifiers?: TrackingIdentifier[];
  /** @description List of attributes */
  attributes?: TrackingAttribute[];
}
