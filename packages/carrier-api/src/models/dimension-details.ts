import { Dimensions } from './dimensions';

export interface DimensionDetails {
  /**
   * The dimensions in Centimeters rounded to the fourth decimal place.
   */
  dimensions_in_centimeters?: null | Dimensions;
  /**
   * The dimensions in Inches rounded to the fourth decimal place.
   */
  dimensions_in_inches?: null | Dimensions;
  /**
   * This represents the original unit of measurement.
   */
  source_dimension_unit: DimensionUnit | null;
  /**
   * The dimensions in the original dimensions rounded to the fourth decimal place.
   */
  source_dimensions?: null | Dimensions;
}

export enum DimensionUnit {
  Centimeters = "centimeters",
  Inches = "inches",
}
