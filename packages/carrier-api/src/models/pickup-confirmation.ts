import { Identifier } from "./identifier";
import { ShipmentIdentifier } from "./shipment-identifier";

export interface PickupConfirmation {
  /**
   * Other identifiers potentially needed in other calls.
   */
  alternate_identifiers?: Array<Identifier> | null;
  /**
   * The primary confirmation ID for this request.
   */
  confirmation_id?: null | string;
  /**
   * List of the shipments added for this pickup.
   */
  shipment_identifiers?: Array<ShipmentIdentifier> | null;
}
