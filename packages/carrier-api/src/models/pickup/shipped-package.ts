import { Identifier } from '../identifier';
import { DimensionDetails } from '../units/dimension-details';
import { WeightDetails } from '../units/weight-details';
import { Dimensions } from '../units/dimensions';

export interface ShippedPackage {
  tracking_number?: string;
  alternative_identifiers?: Identifier[];
  dimension_details?: DimensionDetails;
  weight_details?: WeightDetails;
  package_code?: string;
  weight?: number;
  dimensions?: Dimensions;
}
