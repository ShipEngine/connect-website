import { Manifest } from '../models/manifest';
import { BaseResponse } from './base-response';

export interface CreateManifestResponse extends BaseResponse {
    transaction_id: string;
    manifests: Manifest[];
}
