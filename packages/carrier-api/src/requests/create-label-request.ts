import { BaseRequest } from './base-request';
import {
  AdvancedOptions,
  ConfirmationTypes,
  Currency,
  Customs,
  FulfillmentPlanDetails,
  InsuranceProviders,
  LabelFormats,
  LabelLayouts,
  Package,
  ReturnLabelDetails,
  ShipFrom,
  ShipFromDisplay,
  ShipTo,
} from '../models';

export interface CreateLabelRequest extends BaseRequest {
  service_code?: string;
  ship_datetime: string;
  confirmation?: ConfirmationTypes;
  label_format?: LabelFormats;
  label_layout?: LabelLayouts;
  is_test_label?: boolean;
  advanced_options?: AdvancedOptions;
  insurance_provider?: InsuranceProviders;
  insured_value?: Currency;
  is_return_label: boolean;
  is_residential: boolean;
  packages: Package[];
  customs?: Customs;
  ship_to: ShipTo;
  ship_from: ShipFrom;
  ship_from_display?: ShipFromDisplay;
  next_day?: boolean;
  international?: boolean;
  reference?: string;
  shipment_details?: { [key: string]: any };
  return_details?: ReturnLabelDetails;
  fulfillment_plan_details?: FulfillmentPlanDetails;
}
