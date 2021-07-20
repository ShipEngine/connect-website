import { ShippedShipment } from '..';
import { ShipFrom } from '../addresses';

/** @description Basic structure for a request to void a label */
export interface VoidRequest extends ShippedShipment {
  void_request_id: string;
  ship_from: ShipFrom;
}
