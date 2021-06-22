import { BaseRequest } from './base-request';
import { ShipFrom, AdvancedOptions, ShippedShipment } from '../models';

/** @description Basic structure for a request to create manifests */
export interface CreateManifestRequest extends BaseRequest {
  ship_from?: ShipFrom;
  included_labels?: ShippedShipment[];
  excluded_labels?: ShippedShipment[];
  open_datetime?: string;
  close_datetime: string;
  advanced_options?: AdvancedOptions;
}
