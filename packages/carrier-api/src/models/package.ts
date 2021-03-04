import { DimensionDetails } from "./units/dimension-details";
import { WeightDetails } from "./units/weight-details";
import { Currency } from "./currency";
import { LabelMessage } from "./labels/label-message";
import { Dimensions } from "./units/dimensions";

export interface Package {
  package_code?: string;
  dimension_details?: DimensionDetails;
  weight_details?: WeightDetails;
  insured_value: Currency;
  label_messages?: LabelMessage;
  weight?: number;
  dimensions?: Dimensions;
}
