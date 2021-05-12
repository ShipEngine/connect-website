import { Identifier } from "../identifier";
import { ShipmentIdentifier } from "./shipment-identifier";

/** @description Basic structure for a pickup confirmation */
export interface PickupConfirmation {
  confirmation_id?: string;
  alternate_identifiers?: Identifier[];
  shipment_identifiers?: ShipmentIdentifier[];
}
