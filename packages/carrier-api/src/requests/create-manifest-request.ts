import { BaseRequest } from './base-request';
import { ShipFrom, Label, AdvancedOptions } from '../models';

export interface CreateManifestRequest extends BaseRequest {
  ship_from?: ShipFrom;
  included_labels?: Label[];
  excluded_labels?: Label[];
  open_datetime?: string;
  close_datetime: string;
  advanced_options?: AdvancedOptions;
}
