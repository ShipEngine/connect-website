export interface WeightDetails {
  /**
   * The weight in its original unit of measurement rounded to the fourth decimal place.
   */
  source_weight: number;
  /**
   * This model describes the possible units of weight.
   */
  source_weight_unit: WeightUnit | null;
  /**
   * The weight in grams rounded to the fourth decimal place.
   */
  weight_in_grams: number;
  /**
   * The weight in ounces rounded to the fourth decimal place.
   */
  weight_in_ounces: number;
}

export enum WeightUnit {
  Grams = "grams",
  Kilograms = "kilograms",
  Ounces = "ounces",
  Pounds = "pounds",
}
