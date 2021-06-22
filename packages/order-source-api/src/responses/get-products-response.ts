import { Product } from '../models';

/** @description The response for the GetProducts method */
export interface GetProductsResponse {
  /** @description The list of Products */
  products: Product[];
}
