import { Currency } from "../currency";
import { WeightDetails } from "../units";

/** @description Basic structure of an item in a customs declaration */
export interface CustomsItem {
  description?: string;
  quantity?: number;
  value?: Currency;
  country_of_origin?: string;
  harmonized_tariff_code?: string;
  sku?: string;
  sku_description?: string;
  item_weight?: WeightDetails;
}
