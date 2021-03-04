export enum DimensionsUnit {
  Centimeter = "Centimeter",
  Inch = "Inch",
}

export interface Dimensions {
  unit: DimensionsUnit;
  height: number;
  width: number;
  length: number;
}
