import { WeightUnit } from "./weight-unit";

/** @description Basic structure for weight */
export interface WeightDetails {
  weight_in_ounces?: number;
  weight_in_grams?: number;
  source_weight?: number;
  source_weight_unit: WeightUnit;
}
