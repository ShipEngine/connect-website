import { BaseRequest } from "./base-request";
import {
  ConfirmationTypes,
  AdvancedOptions,
  InsuranceProviders,
  Currency,
  Package,
  Customs,
  ShipFrom,
  ShipTo,
  FulfillmentPlanDetails,
} from "../models";

export interface GetRatesRequest extends BaseRequest {
  service_code?: string;
  ship_datetime: string;
  confirmation?: ConfirmationTypes;
  advanced_options?: AdvancedOptions;
  insurance_provider?: InsuranceProviders;
  insured_value?: Currency;
  is_return_label: boolean;
  is_residential: boolean;
  packages: Package[];
  customs?: Customs;
  ship_to: ShipTo;
  ship_from: ShipFrom;
  international?: boolean;
  next_day?: boolean;
  fulfillment_plan_details?: FulfillmentPlanDetails;
}
