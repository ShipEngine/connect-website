import { BrandedImages, Route } from '.';

/** @description This exposes the base needs for an app to be succeful in the generic connect runtime */
export interface ConnectRuntimeApp {
  /** @description The routes your application should expose */
  routes: Route[];
  /** @description The metadata associated with your application */
  data: any;
  /** @description A method that returns an array of images associated with branded entities within your app */
  getImages: () => BrandedImages[];
  /** @description A method that validates the metadata for an app and returns an array of errors if they exist */
  validate: () => string[] | undefined;
  /** @description String containing yaml file to display with redoc  */
  redoc?: string;
}
