import { Identifier } from "../identifier";

/** @description Identifier object for shiments */
export interface ShipmentIdentifier {
  tracking_number?: string;
  alternate_identifiers?: Identifier[];
}
