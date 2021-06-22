import { BaseRequest } from './base-request';
import { VoidRequest } from '../models';

/** @description Basic structure for a request to void labels */
export interface VoidLabelsRequest extends BaseRequest {
  /** @description List of void requests */
  void_requests: VoidRequest[];
}
