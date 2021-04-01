/**
 * @description The unit of measurement of dimensions
 */
export enum DimensionsUnit {
  Centimeter = "Centimeter",
  Inch = "Inch",
}

/**
 * @description The definition of dimensions for an item or package
 */
export interface Dimensions {
  /** @description The unit associated with these dimensions */
  unit: DimensionsUnit;
  /** @description The height of the item in dimension units */
  height: number;
  /** @description The width of the item in dimension units */
  width: number;
  /** @description The length of the item in dimension units */
  length: number;
}
