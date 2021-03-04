import { Weight } from "./weight";
import { Dimensions } from "./dimensions";

export interface ProductIdentifiers {
  sku?: string;
  upc?: string;
  isbn?: string;
  asin?: string;
  fulfillment_sku?: string;
  inventory_id?: string;
}

export interface ProductDetail {
  name: string;
  value: string;
}

export interface ProductUrls {
  product_url?: string;
  image_url?: string;
  thumbnail_url?: string;
}

export interface Product {
  product_id: string;
  name: string;
  description?: string;
  identifiers?: ProductIdentifiers;
  details?: ProductDetail[];
  unit_cost?: number;
  weight?: Weight;
  dimensions?: Dimensions;
  urls?: ProductUrls;
  /** The location the product can be found in a warehouse */
  location?: string;
}
