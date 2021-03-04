export enum WeightUnit {
  Gram = "Gram",
  Ounce = "Ounce",
  Kilogram = "Kilogram",
  Pound = "Pound",
}

export interface Weight {
  unit: WeightUnit;
  value: number;
}
