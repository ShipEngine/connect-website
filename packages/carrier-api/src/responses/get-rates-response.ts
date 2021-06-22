import { BaseResponse } from './base-response';
import { Rate } from '../models';

/** @description Basic structure for a response to get rates */
export interface GetRatesResponse extends BaseResponse {
  rates: Rate[];
}
