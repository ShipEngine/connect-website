import { Request } from "express";

/** @description The Http Verb associated with a given call */
export enum Method {
  POST = "post",
  GET = "get",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

/** @description The definition for a route and how it will be handled */
export interface Route {
  /** @description The path to the endpoint you wish to expose @example "/CreateLabel", "/sales_orders_export" */
  path: string;
  /** @description The http verb used for this endpoint @example "GET", "POST" */
  method: Method;
  /**
   * The method that will be called to handle this request
   *
   */
  handler?: (req: Request) => any | Promise<any>;
}

/** @description This contains the logo and icon for an individual branded entity */
export interface BrandedImages {
  /** @description The id associated with the branded item (typically the carrier id, or ordersource id) */
  id: string;
  /** @description The full path to the logo file */
  logo: string;
  /** @description The full path to the icon file */
  icon: string;
}

/** @description This exposes the base needs for an app to be succeful in the generic connect runtime */
export interface App {
  /** @description The routes your application should expose */
  routes: Route[];
  /** @description The metadata associated with your application */
  data: any;
  /** @description A method that returns an array of images associated with branded entities within your app */
  getImages: () => BrandedImages[];
  /** @description String containing yaml file to display with redoc  */
  redoc?: string;
}
