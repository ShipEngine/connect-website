/** @description This contains the logo and icon for an individual branded entity */
export interface BrandedImages {
  /** @description The id associated with the branded item (typically the carrier id, or ordersource id) */
  id: string;
  /** @description The full path to the logo file */
  logo: string;
  /** @description The full path to the icon file */
  icon: string;
}
