import { Identifier } from "../identifier";

export interface ShipmentIdentifier {
  tracking_number?: string;
  alternate_identifiers?: Identifier[];
}
