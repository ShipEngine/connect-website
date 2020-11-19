import { Dimensions } from './dimensions';
import { DimensionUnit } from './dimension-unit';

export interface DimensionDetails {
  dimensions_in_centimeters?: Dimensions;
  dimensions_in_inches?: Dimensions;
  source_dimensions?: Dimensions;
  source_dimension_unit: DimensionUnit;
}
