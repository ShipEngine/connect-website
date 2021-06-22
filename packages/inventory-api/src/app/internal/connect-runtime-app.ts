import { BrandedImage, Route } from '.';

/** @description This exposes the base needs for an app to be successful in the generic connect runtime */
export interface ConnectRuntimeApp {
  /** @description The routes your application should expose */
  routes: Route[];
  /** @description The metadata associated with your application */
  data: any;
  /** @description A method that returns an array of images associated with branded entities within your app */
  getImages: () => BrandedImage[];
  /** @description String containing yaml file to display with redoc  */
  redoc?: string;
}
