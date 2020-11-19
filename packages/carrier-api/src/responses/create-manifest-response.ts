import { BaseResponse } from './base-response';
import { Manifest } from '../models';

export interface CreateManifestResponse extends BaseResponse {
  transaction_id: string;
  manifests?: Manifest[];
}
