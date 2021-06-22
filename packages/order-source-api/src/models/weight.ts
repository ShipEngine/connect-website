/** @description The unit describing the weight of an item */
export enum WeightUnit {
  Gram = 'Gram',
  Ounce = 'Ounce',
  Kilogram = 'Kilogram',
  Pound = 'Pound',
}

/** @description A measurement of weight */
export interface Weight {
  /** @description The unit this weight was measured in */
  unit: WeightUnit;
  /** @description The value of the weight in weight units */
  value: number;
}
