import { Identifier } from "../identifier";
import { Document } from "../documents";

/** @description Package information provided by the carrier */
export interface LabelPackage {
  tracking_number?: string;
  /** @description Non-tracking alternative ids associated with this package */
  alternative_identifiers?: Identifier[];
  document?: Document[];
}
