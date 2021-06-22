import { BaseRequest } from './base-request';
import {
  ConfirmationTypes,
  AdvancedOptions,
  InsuranceProviders,
  Package,
  Customs,
  ShipFrom,
  ShipTo,
  PudoLocation,
  FulfillmentPlanDetails,
} from '../models';

/** @description Basic structure for a request to get rates */
export interface GetRatesRequest extends BaseRequest {
  service_code?: string;
  ship_datetime: string;
  confirmation?: ConfirmationTypes;
  advanced_options?: AdvancedOptions;
  insurance_provider?: InsuranceProviders;
  is_return_label: boolean;
  is_residential: boolean;
  packages: Package[];
  customs?: Customs;
  ship_to: ShipTo;
  ship_from: ShipFrom;
  pickup_location?: PudoLocation;
  international?: boolean;
  next_day?: boolean;
  fulfillment_plan_details?: FulfillmentPlanDetails;
}
