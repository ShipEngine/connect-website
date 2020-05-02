import { UUID } from "../../types";
import { CustomDataPOJO, DimensionsPOJO, IdentifierPOJO, MonetaryValuePOJO, WeightPOJO } from "../common";
import { PackageItemPOJO } from "./package-item-pojo";

/**
 * A package that has already been created and assigned identifiers
 */
export interface PackagePOJO extends PackageIdentifierPOJO, NewPackagePOJO {
  /**
   * Arbitrary data that was returned for this package when the label was created.
   */
  customData?: CustomDataPOJO;
}

/**
 * Identifies a package
 */
export interface PackageIdentifierPOJO {
  /**
   * The carrier tracking number
   */
  trackingNumber?: string;

  /**
   * Alternative identifiers associated with this package
   */
  identifiers?: IdentifierPOJO[];
}

/**
 * A package that has not yet been created and has no identifiers yet
 */
export interface NewPackagePOJO {
  /**
   * The ID of the packaging used
   */
  packagingID: UUID;

  /**
   * The package dimensions
   */
  dimensions?: DimensionsPOJO;

  /**
   * The package weight
   */
  weight?: WeightPOJO;

  /**
   * The insured value of this package
   */
  insuredValue?: MonetaryValuePOJO;

  /**
   * Indicates whether the package contains alcohol
   */
  containsAlcohol?: boolean;

  /**
   * Indicates whether the
   */
  isNonMachineable?: boolean;

  /**
   * Customized strings the end user expects to appear on their label.
   * The exact location on the label depends on the carrier. Some carriers
   * may limit the number of allowed label messages, or not support them at all.
   */
  labelMessages?: string[];

  /**
   * Describes the items inside the package
   */
  contents?: PackageItemPOJO[];
}
