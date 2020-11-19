import { Identifier } from '../identifier';
import { ShipmentIdentifier } from './shipment-identifier';

export interface PickupConfirmation {
  confirmation_id?: string;
  alternate_identifiers?: Identifier[];
  shipment_identifiers?: ShipmentIdentifier[];
}
