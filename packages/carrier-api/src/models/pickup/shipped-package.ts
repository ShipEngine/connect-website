import { Identifier } from "../identifier";
import { DimensionDetails } from "../units/dimension-details";
import { WeightDetails } from "../units/weight-details";
import { Dimensions } from "../units/dimensions";

/** @description Basic structure for a package that has been shipped */
export interface ShippedPackage {
  tracking_number?: string;
  alternative_identifiers?: Identifier[];
  dimension_details?: DimensionDetails;
  weight_details?: WeightDetails;
  package_code?: string;
  weight?: number;
  dimensions?: Dimensions;
}
