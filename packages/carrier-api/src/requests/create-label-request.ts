import { BaseRequest } from "./base-request";
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
  PudoLocation,
  ShipFromDisplay,
  ShipTo,
} from "../models";

/** @description Basic structure for a request to create a label */
export interface CreateLabelRequest extends BaseRequest {
  service_code?: string;
  ship_datetime: string;
  confirmation?: ConfirmationTypes;
  label_format?: LabelFormats;
  label_layout?: LabelLayouts;
  /** @description Whether the request is for a test */
  is_test_label?: boolean;
  /** @description Any additional options a shipment may require, including custom options */
  advanced_options?: AdvancedOptions;
  insurance_provider?: InsuranceProviders;
  insured_value?: Currency;
  /** @description Whether the shipment is a return */
  is_return_label: boolean;
  /** @description Whether the shipment is to a residential address */
  is_residential: boolean;
  packages: Package[];
  customs?: Customs;
  ship_to: ShipTo;
  ship_from: ShipFrom;
  pickup_location?: PudoLocation;
  ship_from_display?: ShipFromDisplay;
  /** @description Whether the shipment requires next day shipping */
  next_day?: boolean;
  /** @description Whether the shipment is international */
  international?: boolean;
  reference?: string;
  shipment_details?: { [key: string]: any };
  return_details?: ReturnLabelDetails;
  fulfillment_plan_details?: FulfillmentPlanDetails;
}
