import { Currency } from "../currency";

export interface CustomsItem {
  description?: string;
  quantity?: number;
  value?: Currency;
  country_of_origin?: string;
  harmonized_tariff_code?: string;
  sku?: string;
  sku_description?: string;
}
