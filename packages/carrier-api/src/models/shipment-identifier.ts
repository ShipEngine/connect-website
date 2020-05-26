import { Identifier } from "./identifier";

export interface ShipmentIdentifier {
  /**
   * Alternative identifiers associated with this shipment, specific to a shipping provider.
   */
  alternate_identifiers?: Array<null | Identifier> | null;
  /**
   * The tracking number associated with this shipment.
   */
  tracking_number?: null | string;
}
