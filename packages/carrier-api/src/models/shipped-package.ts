import { Identifier} from './identifier';
import { Dimensions } from './dimensions';

export interface ShippedPackage {
  /**
   * Alternative identifiers for the package.
   */
  alternative_identifiers?: Array<Identifier> | null;
  /**
   * The dimensions of the package in centimeters.
   */
  dimensions?: null | Dimensions;
  /**
   * The shipping providers specific code for this packaging type.
   */
  package_code?: null | string;
  /**
   * The carrier specific tracking identifier for this shipment.
   */
  tracking_number?: null | string;
  /**
   * The weight of the package in grams.
   */
  weight?: number | null;
}
