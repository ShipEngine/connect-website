import type { Dimensions, Weight } from "../../common";
import type { PackageIdentifier } from "../packages/package-identifier";
import type { PackagingIdentifier } from "../packaging";

/**
 * Information about a package that is ready to be shipped or has already been shipped.
 */
export interface ShippedPackage extends PackageIdentifier {
  /**
   * The packaging used for this package
   */
  readonly packaging?: PackagingIdentifier | string;

  /**
   * The package dimensions
   */
  readonly dimensions?: Dimensions;

  /**
   * The package weight
   */
  readonly weight?: Weight;

  /**
   * Arbitrary data about this package that will be persisted by the ShipEngine Connect.
   * Must be JSON serializable.
   */
  readonly metadata?: object;
}
