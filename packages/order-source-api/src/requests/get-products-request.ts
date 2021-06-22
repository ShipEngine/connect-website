import { RequestBase } from './request-base';

/** @description A request to get product information */
export interface GetProductsRequest extends RequestBase {
  /** @description The product ids to get data for */
  product_ids?: string[];
}
