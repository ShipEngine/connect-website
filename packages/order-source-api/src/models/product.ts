import { Weight } from "./weight";
import { Dimensions } from "./dimensions";

/** @description A set of identifiers for a product */
export interface ProductIdentifiers {
  /** @description A stock-keeping unit associated with a product by the order source */
  sku?: string;
  /** @description A universal product code associated with a product */
  upc?: string;
  /** @description An international standard book number associated with a product */
  isbn?: string;
  /** @description An Amzon standard identification number associated with a product */
  asin?: string;
  /** @description A stock-keeping unit associated with the fulfillment of an order */
  fulfillment_sku?: string;
  /** @description The identifier needed to set and retrieve inventory levels */
  inventory_id?: string;
}

/** @description Details about a product @example { name: "Color", value: "Red" } */
export interface ProductDetail {
  /** @description The type of the product detail. Example (non-exhaustive) values: 'Color', 'CountryOfManufacture', 'Shape', 'Size', 'Style' */
  name: string;
  /** @description The value of the product detail */
  value: string;
}

/** @description The urls associated with a product */
export interface ProductUrls {
  /** @description A link to the product page if available */
  product_url?: string;
  /** @description A link to the image for a product if available */
  image_url?: string;
  /** @description A link to the image for use in platform thumbnails */
  thumbnail_url?: string;
}

/** @description This represents a product */
export interface Product {
  /** @description This ID of this product in the vendor API */
  product_id: string;
  /** @description The product name */
  name: string;
  /** @description The product description */
  description?: string;
  /** @description Additional identifiers associated with this product */
  identifiers?: ProductIdentifiers;
  /** @description A list of details associated with this product */
  details?: ProductDetail[];
  /** @description The cost of a single product */
  unit_cost?: number;
  /** @description The weight of the product */
  weight?: Weight;
  /** @description The dimensions of the product */
  dimensions?: Dimensions;
  /** @description The urls associated with a product */
  urls?: ProductUrls;
  /** @description The location the product can be found in a warehouse */
  location?: string;
}
