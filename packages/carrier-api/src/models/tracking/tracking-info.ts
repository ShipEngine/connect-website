import { StandardizedStatusCodes } from "./standardized-status-codes";
import { Dimensions } from "../units/dimensions";
import { Service } from "./service";
import { TrackEvent } from "./track-event";

/** @description Basic structure for tracking information */
export interface TrackingInfo {
  carrier_name?: string;
  tracking_number?: string;
  standardized_status_code: StandardizedStatusCodes;
  carrier_status_code?: string;
  carrier_status_description?: string;
  shipped_datetime?: string;
  estimated_delivery_datetime?: string;
  actual_delivery_datetime?: string;
  shipping_problem_description?: string;
  weight?: number;
  dimensions?: Dimensions;
  service?: Service;
  packaging?: string;
  package_count?: number;
  events?: TrackEvent[];
  shipping_problem?: boolean;
  shipping_problem_code?: string;
  error_description?: string;
}
