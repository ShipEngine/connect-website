import { BaseRequest } from './base-request';
import { VoidRequest } from '../models';

export interface VoidLabelsRequest extends BaseRequest {
  void_requests: VoidRequest[];
}
